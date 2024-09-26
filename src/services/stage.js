//stage-options.js
  
export const smokeTestStages = [
  { duration: '5s', target: 3 }
];

export const loadTestStages = [
    { duration: '5m', target: 50 },
    { duration: '5m', target: 100 },
    { duration: '10m', target: 100 },
    { duration: '10m', target: 50 },
    { duration: '5m', target: 0 },
  ];
  
  export const stressTestStages = [
    { duration: '2m', target: 200 },
    { duration: '3m', target: 200 },
    { duration: '2m', target: 300 },
    { duration: '3m', target: 300 },
    { duration: '2m', target: 400 },
    { duration: '3m', target: 400 },
    { duration: '2m', target: 0 },
  ];
  
