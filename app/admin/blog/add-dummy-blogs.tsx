"use client";

import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

// Sample blog posts data
const dummyBlogs = {
  en: [
    {
      title: "The Future of Solar Energy in Gujarat",
      slug: "future-of-solar-energy-gujarat",
      excerpt: "Exploring the potential and growth opportunities for solar energy in Gujarat, one of India's leading states in renewable energy adoption.",
      content: `# The Future of Solar Energy in Gujarat

Gujarat has emerged as a leader in solar energy adoption in India. With abundant sunshine and supportive government policies, the state is positioned to become a solar powerhouse.

## Current Scenario

Currently, Gujarat has an installed solar capacity of over 5GW, contributing significantly to India's renewable energy goals. The state's solar policy has attracted numerous investors and developers.

## Growth Opportunities

Several factors contribute to Gujarat's promising solar future:

1. **Abundant Land Resources**: Large tracts of unused land, particularly in Kutch and North Gujarat, are ideal for solar installations.

2. **Supportive Policies**: The state government offers attractive incentives for solar projects, including:
   - Single-window clearance
   - Exemptions from electricity duty
   - Banking facilities for energy producers

3. **Technical Expertise**: Gujarat has developed substantial technical expertise in solar implementation and maintenance.

## Challenges to Address

Despite the positive outlook, some challenges remain:

- Grid integration and stability
- Energy storage solutions
- Land acquisition complexities

## Conclusion

Gujarat's commitment to solar energy positions it well for sustainable growth. As technology improves and costs decrease, solar energy will play an increasingly important role in the state's energy mix.`,
      coverImage: "/solar_image_01.jpg",
      author: "Gujarat Renewables Team",
      tags: ["solar", "renewable energy", "Gujarat", "policy"],
      language: "en",
      isPublished: true
    },
    {
      title: "Benefits of Leasing Land for Solar Projects",
      slug: "benefits-leasing-land-solar-projects",
      excerpt: "Discover how landowners can generate steady income by leasing their unused land for solar energy projects in Gujarat.",
      content: `# Benefits of Leasing Land for Solar Projects

Landowners across Gujarat are discovering the financial and environmental benefits of leasing their land for solar energy projects. This article explores the key advantages and considerations.

## Steady Long-term Income

One of the most attractive aspects of leasing land for solar projects is the reliable income stream it provides:

- **Lease Duration**: Typically 25-30 years, providing financial security
- **Consistent Payments**: Regular income regardless of economic fluctuations
- **Minimal Effort**: Once installed, solar farms require little involvement from landowners

## Land Suitability Factors

Not all land is equally suitable for solar projects. Here are key factors that make land attractive for solar developers:

1. **Proximity to Substations**: Land within 10km of electrical substations is highly desirable
2. **Topography**: Flat land with minimal shading is ideal
3. **Size**: Larger contiguous parcels (typically 10+ acres) are preferred
4. **Access**: Good road connectivity for construction and maintenance

## Environmental Impact

Solar projects offer significant environmental benefits:

- Reduction in carbon emissions
- Minimal water usage compared to other forms of energy generation
- Low impact on soil quality
- Possibility of dual-use with certain agricultural activities

## Getting Started

If you're interested in leasing your land for solar projects, consider these steps:

1. Evaluate your land's potential
2. Consult with solar land aggregators or developers
3. Review lease agreements carefully
4. Understand tax implications

## Conclusion

Leasing land for solar projects represents an excellent opportunity for landowners to generate steady income while contributing to India's clean energy goals. With proper planning and the right partners, it can be a win-win situation for all involved.`,
      coverImage: "/solar_image_02.jpg",
      author: "Land Acquisition Team",
      tags: ["land leasing", "solar farms", "passive income", "landowners"],
      language: "en",
      isPublished: true
    },
    {
      title: "Understanding Solar Power Purchase Agreements",
      slug: "understanding-solar-power-purchase-agreements",
      excerpt: "A comprehensive guide to Solar Power Purchase Agreements (PPAs) and how they work for energy producers and consumers in India.",
      content: `# Understanding Solar Power Purchase Agreements

A Power Purchase Agreement (PPA) is a critical contract in the solar energy industry. This guide explains how PPAs work and what stakeholders should know.

## What is a Solar PPA?

A Solar Power Purchase Agreement (PPA) is a financial arrangement where:

- A developer arranges for the design, permitting, financing, and installation of a solar energy system on a customer's property at little to no cost
- The developer sells the power generated to the host customer at a fixed rate, typically lower than the local utility's retail rate
- This lower electricity price serves to offset the customer's purchase of electricity from the grid
- The developer gains income from the sales of electricity as well as any tax credits and other incentives generated from the system

## Key Components of a PPA

Effective PPAs typically include:

1. **Term Length**: Usually 10-25 years
2. **Pricing Structure**: Fixed rate or escalator (typically 1-5% annual increase)
3. **System Performance Guarantees**
4. **Maintenance Responsibilities**
5. **End-of-Term Options**: Purchase, renewal, or removal

## Benefits for Different Stakeholders

### For Energy Consumers:
- No or low upfront capital costs
- Reduced energy costs
- Predictable energy pricing
- No system performance or maintenance risks

### For Developers:
- Steady income stream
- Tax incentives and accelerated depreciation benefits
- Renewable Energy Certificates (RECs)

### For Landowners:
- Land lease revenue
- Participation in green energy transition
- Minimal impact on land

## Regulatory Framework in India

India has established several regulations to facilitate PPAs:

- Electricity Act, 2003
- National Tariff Policy
- State-specific solar policies
- Central Electricity Regulatory Commission (CERC) guidelines

## Conclusion

Solar PPAs represent an important financial mechanism for expanding solar energy adoption. Understanding the structure and benefits of these agreements can help all stakeholders make informed decisions in the growing renewable energy market.`,
      coverImage: "/solar_image_03.jpg",
      author: "Gujarat Renewables Team",
      tags: ["PPA", "solar energy", "contracts", "energy finance"],
      language: "en",
      isPublished: true
    }
  ],
  gu: [
    {
      title: "ગુજરાતમાં સૌર ઊર્જાનું ભવિષ્ય",
      slug: "gujarat-ma-saur-urja-nu-bhavishya",
      excerpt: "ગુજરાતમાં સૌર ઊર્જાની સંભાવનાઓ અને વિકાસની તકો વિશે જાણો, જે ભારતના નવીનીકરણીય ઊર્જા અપનાવવામાં અગ્રણી રાજ્યોમાંનું એક છે.",
      content: `# ગુજરાતમાં સૌર ઊર્જાનું ભવિષ્ય

ગુજરાત ભારતમાં સૌર ઊર્જા અપનાવવામાં નેતા તરીકે ઉભરી આવ્યું છે. પુષ્કળ સૂર્યપ્રકાશ અને સરકારની સહાયક નીતિઓ સાથે, રાજ્ય સૌર ઊર્જા શક્તિ બનવા માટે સ્થિત છે.

## વર્તમાન પરિસ્થિતિ

હાલમાં, ગુજરાત પાસે 5GW થી વધુની સ્થાપિત સૌર ક્ષમતા છે, જે ભારતના નવીનીકરણીય ઊર્જાના લક્ષ્યોમાં નોંધપાત્ર યોગદાન આપે છે. રાજ્યની સૌર નીતિએ અનેક રોકાણકારો અને વિકાસકર્તાઓને આકર્ષિત કર્યા છે.

## વિકાસની તકો

ગુજરાતના આશાસ્પદ સૌર ભવિષ્યમાં ઘણા પરિબળો યોગદાન આપે છે:

1. **પુષ્કળ જમીન સંસાધનો**: મોટા પ્રમાણમાં બિનવપરાશી જમીન, ખાસ કરીને કચ્છ અને ઉત્તર ગુજરાતમાં, સૌર સ્થાપના માટે આદર્શ છે.

2. **સહાયક નીતિઓ**: રાજ્ય સરકાર સૌર પ્રોજેક્ટ્સ માટે આકર્ષક પ્રોત્સાહનો આપે છે, જેમાં શામેલ છે:
   - સિંગલ-વિન્ડો ક્લિયરન્સ
   - વીજળી ડ્યુટીમાંથી મુક્તિ
   - ઊર્જા ઉત્પાદકો માટે બેંકિંગ સુવિધાઓ

3. **તકનીકી નિપુણતા**: ગુજરાતે સૌર અમલીકરણ અને જાળવણીમાં નોંધપાત્ર તકનીકી નિપુણતા વિકસાવી છે.

## સંબોધવાના પડકારો

સકારાત્મક દ્રષ્ટિકોણ હોવા છતાં, કેટલાક પડકારો રહે છે:

- ગ્રીડ એકીકરણ અને સ્થિરતા
- ઊર્જા સંગ્રહ ઉકેલો
- જમીન સંપાદનની જટિલતાઓ

## નિષ્કર્ષ

સૌર ઊર્જા પ્રત્યેની ગુજરાતની પ્રતિબદ્ધતા તેને ટકાઉ વિકાસ માટે સારી રીતે સ્થાપિત કરે છે. તકનીકમાં સુધારો થાય અને ખર્ચ ઘટે તેમ, સૌર ઊર્જા રાજ્યના ઊર્જા મિશ્રણમાં વધુને વધુ મહત્વપૂર્ણ ભૂમિકા ભજવશે.`,
      coverImage: "/solar_image_01.jpg",
      author: "ગુજરાત રિન્યુએબલ્સ ટીમ",
      tags: ["સૌર ઊર્જા", "નવીનીકરણીય ઊર્જા", "ગુજરાત", "નીતિ"],
      language: "gu",
      isPublished: true
    },
    {
      title: "સોલાર પ્રોજેક્ટ્સ માટે જમીન ભાડે આપવાના ફાયદા",
      slug: "solar-projects-mate-jamin-bhade-aapvana-fayda",
      excerpt: "જાણો કે જમીન માલિકો ગુજરાતમાં સૌર ઊર્જા પ્રોજેક્ટ્સ માટે તેમની બિનવપરાશી જમીન ભાડે આપીને કેવી રીતે સ્થિર આવક મેળવી શકે છે.",
      content: `# સોલાર પ્રોજેક્ટ્સ માટે જમીન ભાડે આપવાના ફાયદા

ગુજરાતભરના જમીન માલિકો સૌર ઊર્જા પ્રોજેક્ટ્સ માટે તેમની જમીન ભાડે આપવાના આર્થિક અને પર્યાવરણીય લાભો શોધી રહ્યા છે. આ લેખ મુખ્ય ફાયદા અને વિચારણાઓની તપાસ કરે છે.

## સ્થિર લાંબા ગાળાની આવક

સૌર પ્રોજેક્ટ્સ માટે જમીન ભાડે આપવાના સૌથી આકર્ષક પાસાંઓમાંનું એક તે પ્રદાન કરતી વિશ્વસનીય આવકનો પ્રવાહ છે:

- **ભાડાનો સમયગાળો**: સામાન્ય રીતે 25-30 વર્ષ, નાણાકીય સુરક્ષા પ્રદાન કરે છે
- **સાતત્યપૂર્ણ ચુકવણીઓ**: આર્થિક ઉતાર-ચઢાવ ધ્યાનમાં લીધા વિના નિયમિત આવક
- **ન્યૂનતમ પ્રયાસ**: એકવાર સ્થાપિત થયા પછી, સૌર ફાર્મને જમીન માલિકો તરફથી ઓછી સંડોવણીની જરૂર પડે છે

## જમીન યોગ્યતા પરિબળો

તમામ જમીન સૌર પ્રોજેક્ટ્સ માટે સમાન રીતે યોગ્ય નથી. અહીં મુખ્ય પરિબળો છે જે જમીનને સૌર વિકાસકર્તાઓ માટે આકર્ષક બનાવે છે:

1. **સબસ્ટેશનોની નજીકતા**: ઇલેક્ટ્રિકલ સબસ્ટેશનોથી 10 કિમીની અંદરની જમીન ખૂબ વાંછનીય છે
2. **ટોપોગ્રાફી**: ન્યૂનતમ છાયા સાથેની સપાટ જમીન આદર્શ છે
3. **કદ**: મોટા સંલગ્ન પાર્સલ (સામાન્ય રીતે 10+ એકર) પસંદ કરવામાં આવે છે
4. **પ્રવેશ**: બાંધકામ અને જાળવણી માટે સારી રોડ કનેક્ટિવિટી

## પર્યાવરણીય અસર

સૌર પ્રોજેક્ટ્સ નોંધપાત્ર પર્યાવરણીય લાભો આપે છે:

- કાર્બન ઉત્સર્જનમાં ઘટાડો
- ઊર્જા ઉત્પાદનના અન્ય સ્વરૂપોની તુલનામાં ન્યૂનતમ પાણીનો ઉપયોગ
- જમીનની ગુણવત્તા પર ઓછી અસર
- ચોક્કસ કૃષિ પ્રવૃત્તિઓ સાથે ડ્યુઅલ-ઉપયોગની શક્યતા

## શરૂઆત કેવી રીતે કરવી

જો તમે તમારી જમીન સૌર પ્રોજેક્ટ્સ માટે ભાડે આપવામાં રસ ધરાવતા હો, તો આ પગલાંઓ પર વિચાર કરો:

1. તમારી જમીનની ક્ષમતાનું મૂલ્યાંકન કરો
2. સૌર જમીન એકત્રીકરણ કરનારાઓ અથવા વિકાસકર્તાઓ સાથે પરામર્શ કરો
3. ભાડા કરારોની કાળજીપૂર્વક સમીક્ષા કરો
4. કર અસરોને સમજો

## નિષ્કર્ષ

સૌર પ્રોજેક્ટ્સ માટે જમીન ભાડે આપવી એ જમીન માલિકો માટે સ્થિર આવક ઉત્પન્ન કરવા અને ભારતના સ્વચ્છ ઊર્જાના લક્ષ્યોમાં યોગદાન આપવા માટે એક ઉત્તમ તક રજૂ કરે છે. યોગ્ય આયોજન અને યોગ્ય ભાગીદારો સાથે, તે સંકળાયેલા તમામ માટે જીત-જીતની સ્થિતિ બની શકે છે.`,
      coverImage: "/solar_image_02.jpg",
      author: "જમીન સંપાદન ટીમ",
      tags: ["જમીન ભાડે", "સોલાર ફાર્મ", "પેસિવ આવક", "જમીન માલિકો"],
      language: "gu",
      isPublished: true
    }
  ]
};

export default function AddDummyBlogs() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [addedCount, setAddedCount] = useState(0);

  const addDummyBlogsToFirestore = async (language: 'en' | 'gu') => {
    setIsLoading(true);
    setMessage('');
    setError('');
    let count = 0;

    try {
      for (const blog of dummyBlogs[language]) {
        const now = Timestamp.now();
        await addDoc(collection(db, 'blogs'), {
          ...blog,
          createdAt: now,
          updatedAt: now,
          publishedAt: blog.isPublished ? now : null
        });
        count++;
      }
      setAddedCount(prev => prev + count);
      setMessage(`Successfully added ${count} ${language === 'en' ? 'English' : 'Gujarati'} blog posts!`);
    } catch (err) {
      console.error('Error adding dummy blogs:', err);
      setError(`Error adding blogs: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Dummy Blog Posts</h1>
      <p className="mb-4 text-gray-600">
        Click the buttons below to add pre-defined dummy blog posts to the database.
      </p>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => addDummyBlogsToFirestore('en')}
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? 'Adding...' : 'Add English Blog Posts'}
        </button>

        <button
          onClick={() => addDummyBlogsToFirestore('gu')}
          disabled={isLoading}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-green-400"
        >
          {isLoading ? 'Adding...' : 'Add Gujarati Blog Posts'}
        </button>
      </div>

      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {addedCount > 0 && (
        <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded">
          Total blog posts added: {addedCount}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        <p>After adding blog posts, you can:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>View them on the <a href="/blog" className="text-blue-600 hover:underline" target="_blank">blog page</a></li>
          <li>Manage them in the <a href="/admin/blog" className="text-blue-600 hover:underline">blog admin</a></li>
        </ul>
      </div>
    </div>
  );
} 