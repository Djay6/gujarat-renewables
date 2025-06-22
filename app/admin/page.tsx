"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';

interface BaseRequest {
  id: string;
  name: string;
  mobile: string;
  district: string;
  taluka: string;
  landSize: string;
  createdAt: any;
  userType: 'landowner' | 'company';
  status?: string; // 'new' | 'contacted' | 'spam' | 'unavailable'
  remarks?: string;
  lastUpdated?: any;
}

interface LandRequest extends BaseRequest {
  userType: 'landowner';
  village: string;
  location: string;
  substationName: string;
  substationDistance: string;
  option: string; // 'sell' or 'lease'
  rate: string;
  isOwner: string; // 'yes' or 'no' (broker)
}

interface CompanyRequest extends BaseRequest {
  userType: 'company';
  companyName: string;
  email: string;
  requirements: string;
  budget: string;
  timeline: string;
  option: string; // 'buy' or 'lease'
}

interface MessageRequest {
  id: string;
  name: string;
  emailOrMobile: string;
  message: string;
  createdAt: any;
  userType: 'message';
  status?: string; // 'new' | 'contacted' | 'spam'
  remarks?: string;
  lastUpdated?: any;
}

type Request = LandRequest | CompanyRequest | MessageRequest;

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [requestTypeFilter, setRequestTypeFilter] = useState("all"); // 'all', 'landowner', 'company', 'message'
  
  // Get unique districts for filtering
  const uniqueDistricts = [...new Set(requests.map(req => 'district' in req ? req.district : ''))].filter(Boolean).sort();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded credentials check
    if (email === 'test@test.com' && password === 'Test@123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('ઈમેલ અથવા પાસવર્ડ ખોટો છે.');
    }
  };

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      // Fetch landowner requests
      const landQ = query(collection(db, 'landRequests'), orderBy('createdAt', 'desc'));
      const landSnapshot = await getDocs(landQ);
      const landRequests: Request[] = [];
      
      landSnapshot.forEach((doc) => {
        const data = doc.data();
        landRequests.push({
          id: doc.id,
          ...data,
          userType: data.userType || 'landowner', // Set default userType for existing records
          status: data.status || 'new' // Default status
        } as LandRequest);
      });
      
      // Fetch company requests
      const companyQ = query(collection(db, 'companyRequests'), orderBy('createdAt', 'desc'));
      const companySnapshot = await getDocs(companyQ);
      const companyRequests: Request[] = [];
      
      companySnapshot.forEach((doc) => {
        companyRequests.push({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || 'new' // Default status
        } as CompanyRequest);
      });
      
      // Fetch messages from contact form
      const messagesQ = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const messagesSnapshot = await getDocs(messagesQ);
      const messageRequests: MessageRequest[] = [];
      
      messagesSnapshot.forEach((doc) => {
        const data = doc.data();
        messageRequests.push({
          id: doc.id,
          ...data,
          userType: 'message',
          status: data.status || 'new' // Default status
        } as MessageRequest);
      });
      
      // Combine all types of requests
      const allRequests = [...landRequests, ...companyRequests, ...messageRequests];
      
      // Sort by created date (newest first)
      allRequests.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      
      setRequests(allRequests);
      setFilteredRequests(allRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (request: Request) => {
    setSelectedRequest(request);
    setRemarks(request.remarks || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
    setRemarks("");
  };

  const updateRequestStatus = async (request: Request, newStatus: string) => {
    try {
      let collectionName = 'landRequests';
      if (request.userType === 'company') {
        collectionName = 'companyRequests';
      } else if (request.userType === 'message') {
        collectionName = 'messages';
      }
      
      const requestRef = doc(db, collectionName, request.id);
      await updateDoc(requestRef, {
        status: newStatus,
        lastUpdated: new Date()
      });
      
      // Update local state
      const updatedRequests = requests.map(req => 
        req.id === request.id 
          ? { ...req, status: newStatus, lastUpdated: new Date() } 
          : req
      );
      
      setRequests(updatedRequests);
      applyFilters(updatedRequests);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const saveRemarks = async () => {
    if (!selectedRequest) return;
    
    setIsSaving(true);
    try {
      let collectionName = 'landRequests';
      if (selectedRequest.userType === 'company') {
        collectionName = 'companyRequests';
      } else if (selectedRequest.userType === 'message') {
        collectionName = 'messages';
      }
      
      const requestRef = doc(db, collectionName, selectedRequest.id);
      await updateDoc(requestRef, {
        remarks: remarks,
        lastUpdated: new Date()
      });
      
      // Update local state
      const updatedRequests = requests.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, remarks: remarks, lastUpdated: new Date() } 
          : req
      );
      
      setRequests(updatedRequests);
      applyFilters(updatedRequests);
      setSelectedRequest({...selectedRequest, remarks: remarks});
      
    } catch (error) {
      console.error('Error saving remarks:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const applyFilters = (allRequests = requests) => {
    let filtered = [...allRequests];
    
    // Apply request type filter
    if (requestTypeFilter !== "all") {
      filtered = filtered.filter(req => req.userType === requestTypeFilter);
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(req => req.status === statusFilter);
    }
    
    // Apply district filter
    if (districtFilter) {
      filtered = filtered.filter(req => 
        req.userType === 'message' ? false : (req as BaseRequest).district === districtFilter
      );
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(req => {
        // Type-specific matches
        if (req.userType === 'landowner') {
          const landReq = req as LandRequest;
          return landReq.name.toLowerCase().includes(query) || 
                 landReq.mobile.includes(query) ||
                 landReq.district.toLowerCase().includes(query) || 
                 landReq.village.toLowerCase().includes(query);
        } else if (req.userType === 'company') {
          const companyReq = req as CompanyRequest;
          return companyReq.name.toLowerCase().includes(query) || 
                 companyReq.mobile.includes(query) ||
                 companyReq.district.toLowerCase().includes(query) || 
                 companyReq.companyName.toLowerCase().includes(query) ||
                 companyReq.email.toLowerCase().includes(query);
        } else {
          // Message type
          const messageReq = req as MessageRequest;
          return messageReq.name.toLowerCase().includes(query) || 
                 messageReq.emailOrMobile.toLowerCase().includes(query) ||
                 messageReq.message.toLowerCase().includes(query);
        }
      });
    }
    
    setFilteredRequests(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [statusFilter, districtFilter, searchQuery, requestTypeFilter]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchRequests();
    }
  }, [isLoggedIn]);

  const getUserTypeBadge = (userType: string) => {
    if (userType === 'landowner') {
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">જમીન માલિક</span>;
    } else if (userType === 'company') {
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">સોલાર કંપની</span>;
    } else {
      return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">સંદેશ</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'contacted':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">સંપર્ક કર્યો</span>;
      case 'spam':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">સ્પામ</span>;
      case 'unavailable':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">ઉપલબ્ધ નથી</span>;
      case 'new':
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">નવું</span>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              એડમિન લોગિન
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">ઈમેલ એડ્રેસ</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="ઈમેલ એડ્રેસ"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">પાસવર્ડ</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="પાસવર્ડ"
                />
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <p className="text-sm">{loginError}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-green-500 group-hover:text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </span>
                લોગિન કરો
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-5 mb-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            ગુજરાત રિન્યુએબલ્સ એડમિન
          </h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            લોગઆઉટ
          </button>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Request Type Filter */}
              <div>
                <label htmlFor="requestTypeFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  રિક્વેસ્ટ પ્રકાર
                </label>
                <select
                  id="requestTypeFilter"
                  value={requestTypeFilter}
                  onChange={(e) => setRequestTypeFilter(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="all">બધા પ્રકારો</option>
                  <option value="landowner">જમીન માલિકો</option>
                  <option value="company">સોલાર કંપનીઓ</option>
                  <option value="message">સંદેશ</option>
                </select>
              </div>
              
              {/* Status Filter */}
              <div>
                <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  સ્ટેટસ
                </label>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="all">બધા સ્ટેટસ</option>
                  <option value="new">નવું</option>
                  <option value="contacted">સંપર્ક કર્યો</option>
                  <option value="unavailable">ઉપલબ્ધ નથી</option>
                  <option value="spam">સ્પામ</option>
                </select>
              </div>
              
              {/* District Filter */}
              <div>
                <label htmlFor="districtFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  જિલ્લો
                </label>
                <select
                  id="districtFilter"
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="">બધા જિલ્લા</option>
                  {uniqueDistricts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              
              {/* Search */}
              <div>
                <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
                  શોધો
                </label>
                <input
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="નામ અથવા મોબાઇલ નંબર"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              {isLoading ? (
                <div className="py-10 text-center">
                  <svg className="animate-spin mx-auto h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-2 text-gray-500">લોડ થઈ રહ્યું છે...</p>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">કોઈ રિક્વેસ્ટ મળી નથી.</p>
                </div>
              ) : (
                <div className="mt-4 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              પ્રકાર
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              વિગતો
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              સંપર્ક
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              વિગતો
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              સ્ટેટસ
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ક્રિયાઓ
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRequests.map((request, index) => (
                            <tr key={request.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {getUserTypeBadge(request.userType)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {request.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {request.userType === 'landowner' ? (
                                    `${(request as LandRequest).village}, ${(request as LandRequest).district}`
                                  ) : request.userType === 'company' ? (
                                    (request as CompanyRequest).companyName
                                  ) : (
                                    `${(request as MessageRequest).message.substring(0, 30)}${(request as MessageRequest).message.length > 30 ? '...' : ''}`
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {request.userType === 'message' ? 
                                    (request as MessageRequest).emailOrMobile :
                                    (request as BaseRequest).mobile
                                  }
                                </div>
                                {request.userType === 'company' && (
                                  <div className="text-sm text-gray-500">
                                    {(request as CompanyRequest).email}
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {request.userType === 'landowner' ? (
                                  <>
                                    <div className="text-sm text-gray-900">
                                      {(request as LandRequest).landSize} એકર
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {(request as LandRequest).option === 'sell' ? 'વેચાણ' : 'ભાડા પર'} - ₹{(request as LandRequest).rate}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {(request as LandRequest).isOwner === 'yes' ? 'માલિક' : 'દલાલ'}
                                    </div>
                                  </>
                                ) : request.userType === 'company' ? (
                                  <>
                                    <div className="text-sm text-gray-900">
                                      {(request as CompanyRequest).landSize} એકર
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {(request as CompanyRequest).option === 'buy' ? 'ખરીદવા માંગે છે' : 'ભાડે લેવા માંગે છે'}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      બજેટ: ₹{(request as CompanyRequest).budget}
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-sm text-gray-500 italic">
                                    સંદેશ
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(request.status || 'new')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => openModal(request)}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                >
                                  જુઓ
                                </button>
                                <div className="inline-flex rounded-md shadow-sm mt-1" role="group">
                                  <button
                                    type="button"
                                    onClick={() => updateRequestStatus(request, 'contacted')}
                                    className="px-2 py-1 text-xs font-medium rounded-l-lg border border-gray-200 bg-white text-gray-900 hover:bg-gray-100"
                                  >
                                    સંપર્ક કર્યો
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateRequestStatus(request, 'unavailable')}
                                    className="px-2 py-1 text-xs font-medium border-t border-b border-gray-200 bg-white text-gray-900 hover:bg-gray-100"
                                  >
                                    ઉપલબ્ધ નથી
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateRequestStatus(request, 'spam')}
                                    className="px-2 py-1 text-xs font-medium rounded-r-lg border border-gray-200 bg-white text-gray-900 hover:bg-gray-100"
                                  >
                                    સ્પામ
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedRequest.userType === 'landowner' ? 'જમીન માલિકની વિગતો' : selectedRequest.userType === 'company' ? 'કંપનીની વિગતો' : 'સંદેશ'}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                  >
                    <span className="sr-only">બંધ કરો</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">નામ</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedRequest.name}</dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">સ્ટેટસ</dt>
                      <dd className="mt-1 text-sm text-gray-900 flex items-center">
                        {getStatusBadge(selectedRequest.status || 'new')}
                        {selectedRequest.userType !== 'message' && (
                          selectedRequest.userType === 'landowner' ? (
                            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              {(selectedRequest as LandRequest).option === 'sell' ? 'વેચાણ' : 'ભાડે'}
                            </span>
                          ) : selectedRequest.userType === 'company' ? (
                            <>
                              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                (selectedRequest as CompanyRequest).option === 'buy' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {(selectedRequest as CompanyRequest).option === 'buy' ? 'ખરીદવા' : 'ભાડે લેવા'}
                              </span>
                            </>
                          ) : null
                        )}
                      </dd>
                    </div>
                    
                    {/* Contact information */}
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {selectedRequest.userType === 'message' ? 'ઇમેઇલ/મોબાઇલ' : 'મોબાઇલ'}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {selectedRequest.userType === 'message' ? 
                          (selectedRequest as MessageRequest).emailOrMobile : 
                          (selectedRequest as BaseRequest).mobile
                        }
                      </dd>
                    </div>
                    
                    {/* Type-specific details */}
                    {selectedRequest.userType === 'landowner' ? (
                      <>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">જમીન</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as LandRequest).landSize} એકર</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">જિલ્લો</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as LandRequest).district}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">તાલુકો</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as LandRequest).taluka}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">ગામ</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as LandRequest).village}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">સબસ્ટેશન</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as LandRequest).substationName}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">સબસ્ટેશનથી અંતર</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as LandRequest).substationDistance} કિમી</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">દર</dt>
                          <dd className="mt-1 text-sm text-gray-900">₹{(selectedRequest as LandRequest).rate}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">માલિક છે?</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as LandRequest).isOwner === 'yes' ? 'હા' : 'ના (દલાલ)'}</dd>
                        </div>
                      </>
                    ) : selectedRequest.userType === 'company' ? (
                      <>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">કંપની</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as CompanyRequest).companyName}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">ઈમેલ</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as CompanyRequest).email}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">જરૂરિયાત</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as CompanyRequest).landSize} એકર</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">બજેટ</dt>
                          <dd className="mt-1 text-sm text-gray-900">₹{(selectedRequest as CompanyRequest).budget}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">સમયમર્યાદા</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as CompanyRequest).timeline}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">જિલ્લો</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as CompanyRequest).district}</dd>
                        </div>
                        
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">તાલુકો</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as CompanyRequest).taluka}</dd>
                        </div>
                        
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">જરૂરિયાતની વિગતો</dt>
                          <dd className="mt-1 text-sm text-gray-900">{(selectedRequest as CompanyRequest).requirements}</dd>
                        </div>
                      </>
                    ) : null}
                  
                    {/* Message content for message type */}
                    {selectedRequest.userType === 'message' && (
                      <div className="sm:col-span-2 mt-4">
                        <dt className="text-sm font-medium text-gray-500">સંદેશ</dt>
                        <dd className="mt-1 text-sm text-gray-900 p-3 bg-gray-50 rounded-md">
                          {(selectedRequest as MessageRequest).message}
                        </dd>
                      </div>
                    )}

                    {/* Timing info for both */}
                    <div className="sm:col-span-2 mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">રિક્વેસ્ટ મળી:</span> {selectedRequest.createdAt.toDate().toLocaleString('gu-IN')}
                      </p>
                      {selectedRequest.lastUpdated && (
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="font-medium">છેલ્લો અપડેટ:</span> {selectedRequest.lastUpdated.toDate().toLocaleString('gu-IN')}
                        </p>
                      )}
                    </div>
                  
                    {/* Remarks section */}
                    <div className="sm:col-span-2 mt-6">
                      <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">
                        રિમાર્ક્સ
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="remarks"
                          name="remarks"
                          rows={3}
                          className="shadow-sm block w-full focus:ring-green-500 focus:border-green-500 sm:text-sm border border-gray-300 rounded-md"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                        />
                      </div>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={saveRemarks}
                  disabled={isSaving}
                >
                  {isSaving ? 'સેવ થઈ રહ્યું છે...' : 'રિમાર્ક્સ સેવ કરો'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  બંધ કરો
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 