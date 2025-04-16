"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';

interface LandRequest {
  id: string;
  name: string;
  mobile: string;
  village: string;
  district: string;
  taluka: string;
  location: string;
  landSize: string;
  option: string;
  rate: string;
  isOwner: string;
  createdAt: any;
  // New fields
  status?: string; // 'new' | 'contacted' | 'spam' | 'unavailable'
  remarks?: string;
  lastUpdated?: any;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [landRequests, setLandRequests] = useState<LandRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<LandRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LandRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get unique districts for filtering
  const uniqueDistricts = [...new Set(landRequests.map(req => req.district))].filter(Boolean).sort();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded credentials check
    if (email === 'dhananjayrenew@gmail.com' && password === 'Soya@123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('ઈમેલ અથવા પાસવર્ડ ખોટો છે.');
    }
  };

  const fetchLandRequests = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'landRequests'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const requests: LandRequest[] = [];
      
      querySnapshot.forEach((doc) => {
        requests.push({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || 'new' // Default status
        } as LandRequest);
      });
      
      setLandRequests(requests);
      setFilteredRequests(requests);
    } catch (error) {
      console.error('Error fetching land requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (request: LandRequest) => {
    setSelectedRequest(request);
    setRemarks(request.remarks || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
    setRemarks("");
  };

  const updateRequestStatus = async (request: LandRequest, newStatus: string) => {
    try {
      const requestRef = doc(db, 'landRequests', request.id);
      await updateDoc(requestRef, {
        status: newStatus,
        lastUpdated: new Date()
      });
      
      // Update local state
      const updatedRequests = landRequests.map(req => 
        req.id === request.id 
          ? { ...req, status: newStatus, lastUpdated: new Date() } 
          : req
      );
      
      setLandRequests(updatedRequests);
      applyFilters(updatedRequests);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const saveRemarks = async () => {
    if (!selectedRequest) return;
    
    setIsSaving(true);
    try {
      const requestRef = doc(db, 'landRequests', selectedRequest.id);
      await updateDoc(requestRef, {
        remarks: remarks,
        lastUpdated: new Date()
      });
      
      // Update local state
      const updatedRequests = landRequests.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, remarks: remarks, lastUpdated: new Date() } 
          : req
      );
      
      setLandRequests(updatedRequests);
      applyFilters(updatedRequests);
      setSelectedRequest({...selectedRequest, remarks: remarks});
      
    } catch (error) {
      console.error('Error saving remarks:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const applyFilters = (requests = landRequests) => {
    let filtered = [...requests];
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(req => req.status === statusFilter);
    }
    
    // Apply district filter
    if (districtFilter) {
      filtered = filtered.filter(req => req.district === districtFilter);
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(req => 
        req.name.toLowerCase().includes(query) || 
        req.village.toLowerCase().includes(query) || 
        req.mobile.includes(query)
      );
    }
    
    setFilteredRequests(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [statusFilter, districtFilter, searchQuery]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchLandRequests();
    }
  }, [isLoggedIn]);

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
                <label htmlFor="email-address" className="sr-only">
                  ઈમેલ એડ્રેસ
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="ઈમેલ એડ્રેસ"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  પાસવર્ડ
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="પાસવર્ડ"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {loginError && (
              <div className="text-red-600 text-sm">{loginError}</div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg 
                    className="h-5 w-5 text-green-500 group-hover:text-green-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                      clipRule="evenodd" 
                    />
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
    <div className="min-h-screen bg-gray-100">
      <div className="bg-green-700 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">ગુજરાત રિન્યુએબલ્સ એડમિન</h1>
        </div>
      </div>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">જમીન વિનંતીઓની યાદી</h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">ખેડૂતો અને માલિકો દ્વારા સબમિટ કરવામાં આવેલી માહિતી.</p>
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  લોગઆઉટ
                </button>
              </div>
              
              {/* Filter controls */}
              <div className="px-4 py-3 bg-gray-50 border-t border-b border-gray-200">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  {/* Status filter */}
                  <div>
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">સ્થિતિ ફિલ્ટર</label>
                    <select
                      id="status-filter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    >
                      <option value="all">બધા</option>
                      <option value="new">નવા</option>
                      <option value="contacted">સંપર્ક કરેલા</option>
                      <option value="spam">સ્પામ</option>
                      <option value="unavailable">ઉપલબ્ધ નથી</option>
                    </select>
                  </div>
                  
                  {/* District filter */}
                  <div>
                    <label htmlFor="district-filter" className="block text-sm font-medium text-gray-700">જિલ્લો ફિલ્ટર</label>
                    <select
                      id="district-filter"
                      value={districtFilter}
                      onChange={(e) => setDistrictFilter(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    >
                      <option value="">બધા જિલ્લા</option>
                      {uniqueDistricts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Search */}
                  <div className="md:col-span-2">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                      શોધ (નામ, ગામ અથવા મોબાઇલ)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="focus:ring-green-500 focus:border-green-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="શોધ..."
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {isLoading ? (
                <div className="text-center py-12">
                  <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-2 text-gray-600">ડેટા લોડ થઈ રહ્યો છે...</p>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">કોઈ જમીન વિનંતીઓ મળી નથી.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          નામ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          મોબાઇલ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          સ્થળ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          જમીનનું માપ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          વિકલ્પ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          સ્થિતિ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          કાર્યવાહી
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">વિગતો જુઓ</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{request.name}</div>
                            <div className="text-sm text-gray-500">{request.isOwner === 'yes' ? 'માલિક' : 'દલાલ'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.mobile}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{request.village}, {request.taluka}</div>
                            <div className="text-sm text-gray-500">{request.district}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.landSize} એકર
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.option === 'sell' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {request.option === 'sell' ? 'વેચાણ' : 'ભાડે'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(request.status || 'new')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => updateRequestStatus(request, 'contacted')}
                                className="text-blue-600 hover:text-blue-900"
                                title="સંપર્ક કર્યો"
                              >
                                📞
                              </button>
                              <button 
                                onClick={() => updateRequestStatus(request, 'spam')}
                                className="text-red-600 hover:text-red-900"
                                title="સ્પામ"
                              >
                                🚫
                              </button>
                              <button 
                                onClick={() => updateRequestStatus(request, 'unavailable')}
                                className="text-gray-600 hover:text-gray-900"
                                title="ઉપલબ્ધ નથી"
                              >
                                ❌
                              </button>
                              <button 
                                onClick={() => updateRequestStatus(request, 'new')}
                                className="text-yellow-600 hover:text-yellow-900"
                                title="નવું"
                              >
                                🔄
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => openModal(request)}
                              className="text-green-600 hover:text-green-900"
                            >
                              વિગતો જુઓ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">જમીન વિનંતી વિગતો</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4">
              {/* Status badges at top */}
              <div className="mb-4 flex justify-between items-center">
                <div className="flex space-x-2">
                  {getStatusBadge(selectedRequest.status || 'new')}
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedRequest.option === 'sell' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedRequest.option === 'sell' ? 'વેચાણ' : 'ભાડે'}
                  </span>
                </div>
                
                {/* Status change buttons */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => updateRequestStatus(selectedRequest, 'contacted')}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedRequest.status === 'contacted' 
                        ? 'bg-blue-200 text-blue-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
                    }`}
                  >
                    સંપર્ક કર્યો
                  </button>
                  <button 
                    onClick={() => updateRequestStatus(selectedRequest, 'spam')}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedRequest.status === 'spam' 
                        ? 'bg-red-200 text-red-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-red-100'
                    }`}
                  >
                    સ્પામ
                  </button>
                  <button 
                    onClick={() => updateRequestStatus(selectedRequest, 'unavailable')}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedRequest.status === 'unavailable' 
                        ? 'bg-gray-300 text-gray-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    ઉપલબ્ધ નથી
                  </button>
                </div>
              </div>

              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">નામ</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRequest.name}</dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">મોબાઇલ નંબર</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a href={`tel:${selectedRequest.mobile}`} className="text-blue-600 hover:underline">
                      {selectedRequest.mobile}
                    </a>
                  </dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">જિલ્લો</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRequest.district}</dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">તાલુકો</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRequest.taluka}</dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">ગામનું નામ</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRequest.village}</dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">સ્થળ</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRequest.location}</dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">જમીનનું માપ</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRequest.landSize} એકર</dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">દર</dt>
                  <dd className="mt-1 text-sm text-gray-900">₹{selectedRequest.rate}</dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">જમીનના માલિક</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedRequest.isOwner === 'yes' ? 'હા' : 'ના (દલાલ)'}</dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">સબમિટ તારીખ</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {selectedRequest.createdAt ? new Date(selectedRequest.createdAt.toDate()).toLocaleString('gu-IN') : 'N/A'}
                  </dd>
                </div>
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">એન્ટ્રી ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 break-all">{selectedRequest.id}</dd>
                </div>
                
                {/* Remarks section */}
                <div className="sm:col-span-2 border-t border-gray-200 pt-4">
                  <dt className="text-sm font-medium text-gray-500 mb-2">નોંધ</dt>
                  <textarea
                    rows={4}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="અહીં વધારાની માહિતી અથવા નોંધો ઉમેરો..."
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={saveRemarks}
                      disabled={isSaving}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                      {isSaving ? 'સેવ થઈ રહ્યું છે...' : 'નોંધ સેવ કરો'}
                    </button>
                  </div>
                </div>
              </dl>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeModal}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                બંધ કરો
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 