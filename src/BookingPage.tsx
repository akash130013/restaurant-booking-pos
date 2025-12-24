import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';

const TIME_SLOTS: string[] = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];

interface BookingFormData {
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
}

export default function BookingPage() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormData>({ 
    date: '', 
    time: '', 
    guests: 2, 
    name: '', 
    phone: '' 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-800">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Image */}
        <div className="h-32 bg-orange-500 flex items-end p-6">
          <h1 className="text-3xl font-bold text-white">Table Booking</h1>
        </div>

        {/* STEP 1: Selection */}
        {step === 1 && (
          <div className="p-6 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2"><Calendar size={16}/> Select Date</label>
              <input type="date" className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none" 
                onChange={(e) => setFormData({...formData, date: e.target.value})} />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2"><Clock size={16}/> Select Time</label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map(time => (
                  <button key={time} onClick={() => setFormData({...formData, time})}
                    className={`py-2 text-sm rounded-md border transition-all ${formData.time === time ? "bg-orange-600 text-white border-orange-600" : "hover:border-orange-500 text-gray-600"}`}>
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2"><Users size={16}/> Guests</label>
              <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-lg border w-fit">
                <button onClick={() => setFormData(p => ({...p, guests: Math.max(1, p.guests-1)}))} className="w-8 h-8 bg-white rounded shadow text-lg font-bold">-</button>
                <span className="w-4 text-center font-bold">{formData.guests}</span>
                <button onClick={() => setFormData(p => ({...p, guests: p.guests+1}))} className="w-8 h-8 bg-white rounded shadow text-lg font-bold">+</button>
              </div>
            </div>

            <button onClick={() => formData.date && formData.time ? setStep(2) : alert('Please select date & time')}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors">
              Continue
            </button>
          </div>
        )}

        {/* STEP 2: Details */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Your Details</h2>
            <input placeholder="Full Name" required className="w-full p-3 border rounded-lg" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input placeholder="Phone Number" required type="tel" className="w-full p-3 border rounded-lg"
              onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Back</button>
              <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-green-700">Confirm Booking</button>
            </div>
          </form>
        )}

        {/* STEP 3: Success */}
        {step === 3 && (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>
            <p className="text-gray-500">We'll see you on {formData.date} at {formData.time}.</p>
            <button onClick={() => window.location.reload()} className="text-orange-600 font-bold mt-4 hover:underline">Make another booking</button>
          </div>
        )}
      </div>
    </div>
  );
}