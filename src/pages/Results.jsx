import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './Wishes';

const Results = () => {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
      const rsvpData = [];
    try {
      const querySnapshot = await getDocs(collection(db, "come"));

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        rsvpData.push({
                id: doc.id,
                ...doc.data()
            });
        });
      
    } catch (err) {
      console.error('Error fetching guests:', err);
    } finally {
    setRsvps(rsvpData);
      setLoading(false);
      console.log(rsvpData)

    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#055d64] mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#055d64] mb-6">Results: ({rsvps.length})</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rsvps.map((rsvp, index) => (
          <div key={rsvp.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-900">{index}) {rsvp.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                rsvp.attendance === 'yes' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {rsvp.attendance}
              </span>
            </div>
            
            <p className="text-xs text-gray-400 mt-3">
              {rsvp.timestamp?.toDate?.().toLocaleDateString() || 'Recent'}
            </p>
          </div>
        ))}
      </div>

      {rsvps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No guests yet</p>
        </div>
      )}
    </div>
  );
};

export default Results;