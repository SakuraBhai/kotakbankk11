import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { ShieldCheck, Fingerprint, Delete, Lock, Info } from 'lucide-react';

export const LockScreen = () => {
  const { login, user, triggerFeedback, showToast } = useBank();
  const [pin, setPin] = useState([]);
  const [error, setError] = useState(false);

  const handleKeyPress = (num) => {
    if (pin.length < 6) {
      triggerFeedback('beep');
      const newPin = [...pin, num];
      setPin(newPin);
      
      if (newPin.length === 6) {
        setTimeout(() => {
          login();
          showToast("Welcome back, " + user.name.split(' ')[0] + "!", "success");
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      triggerFeedback('beep');
      setPin(pin.slice(0, -1));
    }
  };

  const handleBiometricLogin = () => {
    triggerFeedback('beep');
    setPin(['•', '•', '•', '•', '•', '•']);
    setTimeout(() => {
      login();
      showToast("Biometric verification successful!", "success");
    }, 350);
  };

  return (
    <div className="flex-1 min-h-full h-full flex flex-col justify-between bg-gradient-to-b from-[#ED1B24] via-[#C4121A] to-[#0B2545] text-white p-6 relative overflow-hidden select-none">
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-red-400/10 blur-xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg shadow-black/20 overflow-hidden">
            <img src="/kotak-logo.png" alt="Kotak 811 Logo" className="w-full h-full object-contain rounded-xl" />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight flex items-center gap-1">
              <span>kotak</span>
              <span className="bg-white text-[#ED1B24] text-xs px-1.5 py-0.5 rounded font-extrabold ml-0.5">811</span>
            </div>
            <div className="text-[10px] text-white/80 font-medium tracking-wide">MOBILE BANKING</div>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>256-Bit SSL</span>
        </div>
      </div>

      {/* User Welcome & MPIN Prompt */}
      <div className="flex flex-col items-center justify-center my-auto z-10 text-center py-4">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 p-1 mb-4 shadow-xl relative">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-400 to-red-500 flex items-center justify-center text-2xl font-bold shadow-inner">
            {user.initials}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-[#C4121A]">
            <Lock className="w-3 h-3 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight">Welcome, {user.name}</h2>
        <p className="text-sm text-white/80 mt-1 flex items-center gap-1.5 justify-center">
          <span>CRN: {user.crn}</span>
          <span className="w-1 h-1 rounded-full bg-white/40"></span>
          <span className="text-emerald-300 font-semibold">{user.kycStatus}</span>
        </p>

        {/* 6-Digit MPIN Indicator */}
        <div className="mt-8 mb-2">
          <p className="text-xs text-white/90 uppercase tracking-widest font-semibold mb-3">
            Enter 6-Digit MPIN
          </p>
          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const isFilled = pin.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    isFilled
                      ? 'bg-white scale-125 shadow-lg shadow-white/50 ring-2 ring-white/40'
                      : 'bg-white/25 border border-white/40'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Numeric Keypad */}
      <div className="z-10 max-w-xs mx-auto w-full pb-2">
        <div className="grid grid-cols-3 gap-y-3 gap-x-6 text-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              className="h-14 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/10 active:scale-95 flex items-center justify-center text-xl font-bold transition-all shadow-sm backdrop-blur-sm"
            >
              {num}
            </button>
          ))}
          
          {/* Biometric Icon */}
          <button
            onClick={handleBiometricLogin}
            title="Biometric Fingerprint Login"
            className="h-14 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 flex flex-col items-center justify-center text-emerald-300 transition-all border border-white/10"
          >
            <Fingerprint className="w-6 h-6" />
          </button>

          {/* Zero */}
          <button
            onClick={() => handleKeyPress('0')}
            className="h-14 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/10 active:scale-95 flex items-center justify-center text-xl font-bold transition-all shadow-sm backdrop-blur-sm"
          >
            0
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            title="Backspace"
            className="h-14 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white/80 transition-all border border-white/10"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>

        {/* Demo Disclaimer / Safety Note */}
        <div className="mt-4 text-center">
          <p className="text-[11px] text-white/60 flex items-center justify-center gap-1">
            <Info className="w-3 h-3 flex-shrink-0" />
            <span>Interactive Educational Sandbox • Safe Simulated Data</span>
          </p>
        </div>
      </div>
    </div>
  );
};
