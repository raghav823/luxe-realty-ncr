// src/components/forms/EMICalculator.js
import React, { useState, useEffect } from 'react';
import { formatPrice } from '../../utils/helpers';

const EMICalculator = ({ price }) => {
  const [loanAmount, setLoanAmount] = useState(price * 0.8); // 80% of property price
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / (12 * 100); // Monthly interest rate
    const months = tenure * 12;

    if (principal > 0 && rate > 0 && months > 0) {
      const emiValue = (principal * rate * Math.pow(1 + rate, months)) / 
                      (Math.pow(1 + rate, months) - 1);
      
      const totalAmountValue = emiValue * months;
      const totalInterestValue = totalAmountValue - principal;

      setEmi(Math.round(emiValue));
      setTotalAmount(Math.round(totalAmountValue));
      setTotalInterest(Math.round(totalInterestValue));
    } else {
      setEmi(0);
      setTotalAmount(0);
      setTotalInterest(0);
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const downPayment = price - loanAmount;
  const loanToValue = ((loanAmount / price) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Loan Amount
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min={price * 0.1}
              max={price * 0.9}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between items-center">
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-24 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-sm"
              />
              <span className="text-blue-400 font-semibold text-sm">
                {formatPrice(loanAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Interest Rate (% p.a.)
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="6"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between items-center">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min="6"
                max="15"
                step="0.1"
                className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-sm"
              />
              <span className="text-blue-400 font-semibold text-sm">
                {interestRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tenure (Years)
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between items-center">
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                min="5"
                max="30"
                className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-sm"
              />
              <span className="text-blue-400 font-semibold text-sm">
                {tenure} years
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-lg">
          <div className="text-blue-100 text-sm">Monthly EMI</div>
          <div className="text-white text-2xl font-bold">
            ₹{emi.toLocaleString()}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-lg">
          <div className="text-green-100 text-sm">Down Payment</div>
          <div className="text-white text-2xl font-bold">
            {formatPrice(downPayment)}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-lg">
          <div className="text-purple-100 text-sm">Total Interest</div>
          <div className="text-white text-2xl font-bold">
            {formatPrice(totalInterest)}
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-lg">
          <div className="text-red-100 text-sm">Total Amount</div>
          <div className="text-white text-2xl font-bold">
            {formatPrice(totalAmount)}
          </div>
        </div>
      </div>

      {/* Breakdown Chart */}
      <div className="card">
        <h4 className="text-lg font-semibold text-white mb-4">Payment Breakdown</h4>
        
        {/* Visual Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-gray-300">Principal Amount</span>
            </div>
            <span className="text-white font-semibold">{formatPrice(loanAmount)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-gray-300">Total Interest</span>
            </div>
            <span className="text-white font-semibold">{formatPrice(totalInterest)}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-gray-700 rounded-lg overflow-hidden flex">
            <div 
              className="bg-blue-600 h-full"
              style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
            ></div>
            <div 
              className="bg-red-600 h-full"
              style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-800">
          <div className="text-center">
            <div className="text-gray-400 text-sm">Loan-to-Value</div>
            <div className="text-white text-xl font-bold">{loanToValue}%</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm">Interest vs Principal</div>
            <div className="text-white text-xl font-bold">
              {((totalInterest / loanAmount) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="card bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
        <h4 className="text-lg font-semibold text-white mb-3">💡 EMI Tips</h4>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>• Lower interest rates significantly reduce your total payment</li>
          <li>• Longer tenure reduces EMI but increases total interest</li>
          <li>• Higher down payment reduces loan amount and EMI</li>
          <li>• Consider part-prepayment to reduce interest burden</li>
        </ul>
      </div>

      {/* Eligibility Check */}
      <div className="card">
        <h4 className="text-lg font-semibold text-white mb-4">Check Loan Eligibility</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Monthly Income</label>
            <input
              type="number"
              placeholder="Enter monthly income"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Existing EMIs</label>
            <input
              type="number"
              placeholder="Current EMI obligations"
              className="input-field"
            />
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span>
            <span className="font-semibold">Recommended EMI Range</span>
          </div>
          <p className="text-gray-300 text-sm mt-1">
            Your EMI should not exceed 40% of your monthly income for comfortable repayment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;