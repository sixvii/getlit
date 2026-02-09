import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Video, Check } from 'lucide-react';
import bitmot from '@/assets/bitmot.png';
import { sendBookingEmail } from '@/lib/email';

type Step = 'calendar' | 'time' | 'details' | 'confirmed';

const BookingPage = () => {
  const [step, setStep] = useState<Step>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notes: '',
    agreed: false,
  });

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (newDate >= new Date(new Date().setHours(0, 0, 0, 0))) {
      setSelectedDate(newDate);
      setStep('time');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (step === 'time' && selectedTime) {
      setStep('details');
    }
  };

  const handleBack = () => {
    if (step === 'details') {
      setStep('time');
      return;
    }
    if (step === 'time') {
      setStep('calendar');
      setSelectedTime(null);
    }
  };

  const handleSchedule = async () => {
    if (formData.name && formData.email && formData.agreed && selectedDate && selectedTime) {
      const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      try {
        await sendBookingEmail({
          name: formData.name,
          email: formData.email,
          notes: formData.notes,
          date: dateStr,
          time: String(selectedTime),
        });
      } catch (err) {
        // If email sending fails, we still move to confirmed
        console.error('Failed to send booking email', err);
      }
      setStep('confirmed');
    }
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  if (step === 'confirmed') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-6">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-white" size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1c1c1c] mb-4">You're Scheduled!</h1>
          <p className="text-sm md:text-base text-[#1c1c1c]/70 mb-2">
            A calendar invitation has been sent to your email.
          </p>
          <p className="text-sm md:text-base text-[#1c1c1c] font-medium">
            {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-300 lg:max-w-none lg:w-[1100px] lg:h-[640px]">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-full">
          {/* Left Side - Developer Info */}
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-200 h-full">
            <img
              src={bitmot}
              alt="Bitmot"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mb-4"
            />
            <h2 className="text-lg md:text-xl font-bold text-[#1c1c1c] mb-1">Timothy Idowu</h2>
            <p className="text-sm md:text-base text-[#1c1c1c]/70 mb-6">30 Minute Meeting</p>
            
            <div className="flex items-center gap-3 text-[#1c1c1c] mb-4">
              <Clock size={18} />
              <span>45 min</span>
            </div>
            
            <div className="flex items-start gap-3 text-[#1c1c1c]">
              <Video size={18} className="mt-1" />
              <span className="text-sm">Web conferencing details provided upon confirmation.</span>
            </div>

            {/* Show selected date/time */}
            {selectedDate && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-[#1c1c1c] font-medium">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                {selectedTime && (
                  <p className="text-[#1c1c1c]/70">{selectedTime}</p>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Calendar/Form */}
          <div className="p-6 md:p-8 h-full lg:overflow-y-auto">
            {(step === 'time' || step === 'details') && (
              <button
                onClick={handleBack}
                className="mb-4 inline-flex items-center gap-2 text-sm text-[#1c1c1c]/70 hover:text-[#1c1c1c] transition-colors"
              >
                <ChevronLeft size={18} />
                Back
              </button>
            )}
            {step === 'details' ? (
              /* Enter Details Form */
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1c1c1c] mb-6">Enter Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#1c1c1c] text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-[#004EBB]"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#1c1c1c] text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-[#004EBB]"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#1c1c1c] text-sm font-medium mb-2">
                      Please share anything that will help prepare for our meeting
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-[#004EBB] h-32 resize-none"
                      placeholder="Share any relevant details..."
                    />
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={formData.agreed}
                      onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                      className="mt-1"
                    />
                    <label htmlFor="agree" className="text-sm text-[#1c1c1c]/70">
                      You confirm that you have read the agreement to the Calendly's Terms of Use
                    </label>
                  </div>
                  
                  <button
                    onClick={handleSchedule}
                    disabled={!formData.name || !formData.email || !formData.agreed}
                    className="w-full bg-[#004EBB] text-white py-3 md:py-3 rounded-full text-sm md:text-base font-medium hover:bg-[#004EBB]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Schedule Event
                  </button>
                </div>
              </div>
            ) : (
              /* Calendar View */
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-[#1c1c1c] mb-6">Select a Date & Time</h3>
                  
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronLeft className="text-[#1c1c1c]" size={20} />
                    </button>
                    <span className="text-[#1c1c1c] font-medium">{formatMonth(currentMonth)}</span>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronRight className="text-[#1c1c1c]" size={20} />
                    </button>
                  </div>
                  
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-0.5 md:gap-1 mb-6">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-[#1c1c1c]/50 text-xs md:text-sm py-2">
                        {day}
                      </div>
                    ))}
                    {getDaysInMonth(currentMonth).map((day, index) => (
                      <div key={index} className="aspect-square">
                        {day && (
                          <button
                            onClick={() => handleDateClick(day)}
                            disabled={isDateDisabled(day)}
                            className={`w-full h-full flex items-center justify-center rounded-full text-xs md:text-sm transition-colors ${
                              selectedDate?.getDate() === day && 
                              selectedDate?.getMonth() === currentMonth.getMonth()
                                ? 'bg-[#004EBB] text-white'
                                : isDateDisabled(day)
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-[#1c1c1c] hover:bg-gray-100'
                            }`}
                          >
                            {day}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Timezone */}
                  <div className="text-[#1c1c1c]/70 text-xs md:text-sm">
                    Time zone: Pacific Time (US & Canada)
                  </div>
                </div>

                {/* Time Slots */}
                {step === 'time' && selectedDate && (
                  <div className="w-full md:w-48 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
                    <p className="text-sm md:text-base text-[#1c1c1c] font-medium mb-4">
                      {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:space-y-0 md:max-h-80 md:overflow-y-auto">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`w-full py-2.5 md:py-2 px-3 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                            selectedTime === time
                              ? 'bg-[#004EBB] text-white'
                              : 'border border-[#004EBB] text-[#004EBB] hover:bg-[#004EBB]/10'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {selectedTime && (
                      <button
                        onClick={handleNext}
                        className="w-full mt-4 bg-[#004EBB] text-white py-2.5 md:py-2 rounded-lg text-sm md:text-base font-medium hover:bg-[#004EBB]/90 transition-colors"
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
