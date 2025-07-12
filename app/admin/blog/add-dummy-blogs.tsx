"use client";

import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

// Sample blog posts data
const dummyBlogs = [
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
    isPublished: true
  }
];

export default function AddDummyBlogs() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [addedCount, setAddedCount] = useState(0);

  const addDummyBlogsToFirestore = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');
    let count = 0;

    try {
      for (const blog of dummyBlogs) {
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
      setMessage(`Successfully added ${count} blog posts!`);
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
          onClick={() => addDummyBlogsToFirestore()}
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? 'Adding...' : 'Add Sample Blog Posts'}
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