import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from './Wishes';

const Results = () => {
  const [rsvps, setRsvps] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
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

  const deleteGuest = async (guestId) => {
    if (!window.confirm('Are you sure you want to delete this guest?')) {
      return;
    }

    setDeletingId(guestId);
    try {
      await deleteDoc(doc(db, "come", guestId));
      // Remove the guest from local state
      setRsvps(rsvps.filter(rsvp => rsvp.id !== guestId));
      console.log('Guest deleted successfully');
    } catch (error) {
      console.error('Error deleting guest:', error);
      alert('Failed to delete guest. Please try again.');
    } finally {
      setDeletingId(null);
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
          <div key={rsvp.id} className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg text-gray-900">{index}) {rsvp.name}<br /><span className='invisible'>aa</span></h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                rsvp.attendance === 'yes' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {rsvp.attendance}
              </span>
            </div>
            
            <button
  onClick={() => deleteGuest(rsvp.id)}
  disabled={deletingId === rsvp.id}
  className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 p-1"
  title="Delete guest"
>
  {deletingId === rsvp.id ? (
    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
  ) : (
    '×'
  )}
</button>

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