// Comprehensive biomarker database with normal ranges and units
export const BIOMARKERS = [
  // Common Vital Signs
  { name: 'Weight', units: ['kg', 'lbs', 'g'], normalRange: { min: null, max: null }, category: 'Vital Signs' },
  { name: 'Blood Pressure (Systolic)', units: ['mmHg'], normalRange: { min: 90, max: 120 }, category: 'Vital Signs' },
  { name: 'Blood Pressure (Diastolic)', units: ['mmHg'], normalRange: { min: 60, max: 80 }, category: 'Vital Signs' },
  { name: 'Resting Heart Rate', units: ['bpm'], normalRange: { min: 60, max: 100 }, category: 'Vital Signs' },
  { name: 'Heart Rate', units: ['bpm'], normalRange: { min: 60, max: 100 }, category: 'Vital Signs' },
  { name: 'Blood Oxygen (SpO2)', units: ['%'], normalRange: { min: 95, max: 100 }, category: 'Vital Signs' },
  { name: 'Temperature', units: ['°C', '°F'], normalRange: { min: 36.1, max: 37.2 }, category: 'Vital Signs' },
  { name: 'Respiratory Rate', units: ['breaths/min'], normalRange: { min: 12, max: 20 }, category: 'Vital Signs' },
  
  // Blood Glucose
  { name: 'Blood Glucose', units: ['mg/dL', 'mmol/L'], normalRange: { min: 70, max: 100 }, category: 'Metabolic' },
  { name: 'Fasting Blood Glucose', units: ['mg/dL', 'mmol/L'], normalRange: { min: 70, max: 100 }, category: 'Metabolic' },
  { name: 'HbA1c', units: ['%'], normalRange: { min: 4, max: 5.6 }, category: 'Metabolic' },
  
  // Complete Blood Count (CBC)
  { name: 'White Blood Cell Count (WBC)', units: ['K/uL', 'cells/uL'], normalRange: { min: 4.5, max: 11 }, category: 'Hematology' },
  { name: 'Red Blood Cell Count (RBC)', units: ['M/uL'], normalRange: { min: 4.5, max: 5.9 }, category: 'Hematology' },
  { name: 'Hemoglobin', units: ['g/dL'], normalRange: { min: 13.5, max: 17.5 }, category: 'Hematology' },
  { name: 'Hematocrit', units: ['%'], normalRange: { min: 38.3, max: 48.6 }, category: 'Hematology' },
  { name: 'Platelet Count', units: ['K/uL'], normalRange: { min: 150, max: 400 }, category: 'Hematology' },
  { name: 'Mean Corpuscular Volume (MCV)', units: ['fL'], normalRange: { min: 80, max: 100 }, category: 'Hematology' },
  { name: 'Mean Corpuscular Hemoglobin (MCH)', units: ['pg'], normalRange: { min: 27, max: 33 }, category: 'Hematology' },
  { name: 'Mean Corpuscular Hemoglobin Concentration (MCHC)', units: ['g/dL'], normalRange: { min: 32, max: 36 }, category: 'Hematology' },
  { name: 'Red Cell Distribution Width (RDW)', units: ['%'], normalRange: { min: 11.5, max: 14.5 }, category: 'Hematology' },
  { name: 'Absolute Neutrophil Count', units: ['K/uL'], normalRange: { min: 1.5, max: 8 }, category: 'Hematology' },
  { name: 'Absolute Lymphocyte Count', units: ['K/uL'], normalRange: { min: 1, max: 4 }, category: 'Hematology' },
  { name: 'Absolute Monocyte Count', units: ['K/uL'], normalRange: { min: 0.2, max: 0.8 }, category: 'Hematology' },
  { name: 'Absolute Eosinophil Count', units: ['K/uL'], normalRange: { min: 0, max: 0.5 }, category: 'Hematology' },
  { name: 'Absolute Basophil Count', units: ['K/uL'], normalRange: { min: 0, max: 0.2 }, category: 'Hematology' },
  
  // Comprehensive Metabolic Panel (CMP)
  { name: 'Sodium', units: ['mEq/L', 'mmol/L'], normalRange: { min: 136, max: 145 }, category: 'Electrolytes' },
  { name: 'Potassium', units: ['mEq/L', 'mmol/L'], normalRange: { min: 3.5, max: 5 }, category: 'Electrolytes' },
  { name: 'Chloride', units: ['mEq/L', 'mmol/L'], normalRange: { min: 96, max: 106 }, category: 'Electrolytes' },
  { name: 'Carbon Dioxide (CO2)', units: ['mEq/L', 'mmol/L'], normalRange: { min: 23, max: 29 }, category: 'Electrolytes' },
  { name: 'Blood Urea Nitrogen (BUN)', units: ['mg/dL'], normalRange: { min: 7, max: 20 }, category: 'Kidney Function' },
  { name: 'Creatinine', units: ['mg/dL'], normalRange: { min: 0.7, max: 1.3 }, category: 'Kidney Function' },
  { name: 'Calcium', units: ['mg/dL', 'mmol/L'], normalRange: { min: 8.5, max: 10.2 }, category: 'Electrolytes' },
  { name: 'Albumin', units: ['g/dL'], normalRange: { min: 3.5, max: 5.5 }, category: 'Protein' },
  { name: 'Total Protein', units: ['g/dL'], normalRange: { min: 6, max: 8.3 }, category: 'Protein' },
  { name: 'Alkaline Phosphatase (ALP)', units: ['U/L'], normalRange: { min: 44, max: 147 }, category: 'Liver Function' },
  { name: 'Alanine Aminotransferase (ALT)', units: ['U/L'], normalRange: { min: 7, max: 56 }, category: 'Liver Function' },
  { name: 'Aspartate Aminotransferase (AST)', units: ['U/L'], normalRange: { min: 10, max: 40 }, category: 'Liver Function' },
  { name: 'Bilirubin (Total)', units: ['mg/dL'], normalRange: { min: 0.1, max: 1.2 }, category: 'Liver Function' },
  { name: 'Bilirubin (Direct)', units: ['mg/dL'], normalRange: { min: 0, max: 0.3 }, category: 'Liver Function' },
  
  // Lipid Panel
  { name: 'Total Cholesterol', units: ['mg/dL', 'mmol/L'], normalRange: { min: 0, max: 200 }, category: 'Lipids' },
  { name: 'LDL Cholesterol', units: ['mg/dL', 'mmol/L'], normalRange: { min: 0, max: 100 }, category: 'Lipids' },
  { name: 'HDL Cholesterol', units: ['mg/dL', 'mmol/L'], normalRange: { min: 40, max: 200 }, category: 'Lipids' },
  { name: 'Triglycerides', units: ['mg/dL', 'mmol/L'], normalRange: { min: 0, max: 150 }, category: 'Lipids' },
  { name: 'VLDL Cholesterol', units: ['mg/dL'], normalRange: { min: 2, max: 30 }, category: 'Lipids' },
  
  // Thyroid Function
  { name: 'TSH (Thyroid Stimulating Hormone)', units: ['mIU/L'], normalRange: { min: 0.4, max: 4 }, category: 'Thyroid' },
  { name: 'Free T4 (Thyroxine)', units: ['ng/dL'], normalRange: { min: 0.8, max: 1.8 }, category: 'Thyroid' },
  { name: 'Free T3 (Triiodothyronine)', units: ['pg/mL'], normalRange: { min: 2.3, max: 4.2 }, category: 'Thyroid' },
  { name: 'Total T4', units: ['μg/dL'], normalRange: { min: 5, max: 12 }, category: 'Thyroid' },
  { name: 'Total T3', units: ['ng/dL'], normalRange: { min: 80, max: 200 }, category: 'Thyroid' },
  
  // Vitamins and Minerals
  { name: 'Vitamin D (25-OH)', units: ['ng/mL', 'nmol/L'], normalRange: { min: 30, max: 100 }, category: 'Vitamins' },
  { name: 'Vitamin B12', units: ['pg/mL'], normalRange: { min: 200, max: 900 }, category: 'Vitamins' },
  { name: 'Folate', units: ['ng/mL'], normalRange: { min: 2.7, max: 17 }, category: 'Vitamins' },
  { name: 'Iron', units: ['μg/dL'], normalRange: { min: 60, max: 170 }, category: 'Minerals' },
  { name: 'Ferritin', units: ['ng/mL'], normalRange: { min: 20, max: 250 }, category: 'Minerals' },
  { name: 'Magnesium', units: ['mg/dL'], normalRange: { min: 1.7, max: 2.2 }, category: 'Minerals' },
  { name: 'Phosphorus', units: ['mg/dL'], normalRange: { min: 2.5, max: 4.5 }, category: 'Minerals' },
  { name: 'Zinc', units: ['μg/dL'], normalRange: { min: 60, max: 130 }, category: 'Minerals' },
  
  // Hormones
  { name: 'Testosterone (Total)', units: ['ng/dL'], normalRange: { min: 300, max: 1000 }, category: 'Hormones' },
  { name: 'Testosterone (Free)', units: ['pg/mL'], normalRange: { min: 5, max: 25 }, category: 'Hormones' },
  { name: 'Estradiol', units: ['pg/mL'], normalRange: { min: 10, max: 50 }, category: 'Hormones' },
  { name: 'Progesterone', units: ['ng/mL'], normalRange: { min: 0, max: 20 }, category: 'Hormones' },
  { name: 'Cortisol', units: ['μg/dL'], normalRange: { min: 6, max: 23 }, category: 'Hormones' },
  { name: 'DHEA-S', units: ['μg/dL'], normalRange: { min: 35, max: 430 }, category: 'Hormones' },
  { name: 'Insulin', units: ['μIU/mL'], normalRange: { min: 2.6, max: 24.9 }, category: 'Hormones' },
  { name: 'C-Peptide', units: ['ng/mL'], normalRange: { min: 0.8, max: 3.1 }, category: 'Hormones' },
  { name: 'IGF-1 (Insulin-like Growth Factor)', units: ['ng/mL'], normalRange: { min: 115, max: 307 }, category: 'Hormones' },
  { name: 'Growth Hormone', units: ['ng/mL'], normalRange: { min: 0, max: 5 }, category: 'Hormones' },
  { name: 'Prolactin', units: ['ng/mL'], normalRange: { min: 2, max: 18 }, category: 'Hormones' },
  { name: 'FSH (Follicle Stimulating Hormone)', units: ['mIU/mL'], normalRange: { min: 1.5, max: 12.4 }, category: 'Hormones' },
  { name: 'LH (Luteinizing Hormone)', units: ['mIU/mL'], normalRange: { min: 1.7, max: 8.6 }, category: 'Hormones' },
  
  // Cardiac Markers
  { name: 'Troponin I', units: ['ng/mL'], normalRange: { min: 0, max: 0.04 }, category: 'Cardiac' },
  { name: 'Troponin T', units: ['ng/mL'], normalRange: { min: 0, max: 0.01 }, category: 'Cardiac' },
  { name: 'BNP (B-type Natriuretic Peptide)', units: ['pg/mL'], normalRange: { min: 0, max: 100 }, category: 'Cardiac' },
  { name: 'NT-proBNP', units: ['pg/mL'], normalRange: { min: 0, max: 125 }, category: 'Cardiac' },
  { name: 'CK (Creatine Kinase)', units: ['U/L'], normalRange: { min: 38, max: 174 }, category: 'Cardiac' },
  { name: 'CK-MB', units: ['U/L'], normalRange: { min: 0, max: 5 }, category: 'Cardiac' },
  { name: 'Homocysteine', units: ['μmol/L'], normalRange: { min: 5, max: 15 }, category: 'Cardiac' },
  
  // Inflammation Markers
  { name: 'C-Reactive Protein (CRP)', units: ['mg/L'], normalRange: { min: 0, max: 3 }, category: 'Inflammation' },
  { name: 'High-Sensitivity CRP (hs-CRP)', units: ['mg/L'], normalRange: { min: 0, max: 3 }, category: 'Inflammation' },
  { name: 'Erythrocyte Sedimentation Rate (ESR)', units: ['mm/hr'], normalRange: { min: 0, max: 20 }, category: 'Inflammation' },
  
  // Coagulation
  { name: 'PT (Prothrombin Time)', units: ['seconds'], normalRange: { min: 11, max: 13.5 }, category: 'Coagulation' },
  { name: 'INR', units: ['ratio'], normalRange: { min: 0.8, max: 1.1 }, category: 'Coagulation' },
  { name: 'PTT (Partial Thromboplastin Time)', units: ['seconds'], normalRange: { min: 25, max: 35 }, category: 'Coagulation' },
  { name: 'Fibrinogen', units: ['mg/dL'], normalRange: { min: 200, max: 400 }, category: 'Coagulation' },
  { name: 'D-Dimer', units: ['ng/mL'], normalRange: { min: 0, max: 500 }, category: 'Coagulation' },
  
  // Urinalysis
  { name: 'Urine pH', units: ['pH'], normalRange: { min: 4.5, max: 8 }, category: 'Urinalysis' },
  { name: 'Urine Specific Gravity', units: ['SG'], normalRange: { min: 1.005, max: 1.030 }, category: 'Urinalysis' },
  { name: 'Urine Protein', units: ['mg/dL'], normalRange: { min: 0, max: 14 }, category: 'Urinalysis' },
  { name: 'Urine Glucose', units: ['mg/dL'], normalRange: { min: 0, max: 15 }, category: 'Urinalysis' },
  { name: 'Urine Ketones', units: ['mg/dL'], normalRange: { min: 0, max: 0 }, category: 'Urinalysis' },
  { name: 'Microalbumin/Creatinine Ratio', units: ['mg/g'], normalRange: { min: 0, max: 30 }, category: 'Urinalysis' },
  { name: 'Protein/Creatinine Ratio, Urine', units: ['mg/g'], normalRange: { min: 0, max: 200 }, category: 'Urinalysis' },
  
  // Tumor Markers
  { name: 'PSA (Prostate Specific Antigen)', units: ['ng/mL'], normalRange: { min: 0, max: 4 }, category: 'Tumor Markers' },
  { name: 'CEA (Carcinoembryonic Antigen)', units: ['ng/mL'], normalRange: { min: 0, max: 3 }, category: 'Tumor Markers' },
  { name: 'CA 19-9', units: ['U/mL'], normalRange: { min: 0, max: 37 }, category: 'Tumor Markers' },
  { name: 'CA 125', units: ['U/mL'], normalRange: { min: 0, max: 35 }, category: 'Tumor Markers' },
  { name: 'AFP (Alpha-Fetoprotein)', units: ['ng/mL'], normalRange: { min: 0, max: 10 }, category: 'Tumor Markers' },
  
  // Other Important Biomarkers
  { name: 'Uric Acid', units: ['mg/dL'], normalRange: { min: 3.5, max: 7.2 }, category: 'Metabolic' },
  { name: 'Lactate', units: ['mmol/L'], normalRange: { min: 0.5, max: 2.2 }, category: 'Metabolic' },
  { name: 'Ammonia', units: ['μmol/L'], normalRange: { min: 15, max: 45 }, category: 'Metabolic' },
  { name: 'Amylase', units: ['U/L'], normalRange: { min: 30, max: 110 }, category: 'Pancreatic' },
  { name: 'Lipase', units: ['U/L'], normalRange: { min: 0, max: 160 }, category: 'Pancreatic' },
  { name: 'GGT (Gamma-Glutamyl Transferase)', units: ['U/L'], normalRange: { min: 0, max: 51 }, category: 'Liver Function' },
  { name: 'LDH (Lactate Dehydrogenase)', units: ['U/L'], normalRange: { min: 122, max: 222 }, category: 'General' },
  
  // Additional Specialized Markers
  { name: 'Chromogranin A', units: ['ng/mL'], normalRange: { min: 0, max: 95 }, category: 'Tumor Markers' },
  { name: 'Beta-2 Microglobulin', units: ['mg/L'], normalRange: { min: 0.7, max: 1.8 }, category: 'Kidney Function' },
  { name: 'Cystatin C', units: ['mg/L'], normalRange: { min: 0.53, max: 0.95 }, category: 'Kidney Function' },
  { name: 'eGFR (Estimated GFR)', units: ['mL/min/1.73m²'], normalRange: { min: 90, max: 120 }, category: 'Kidney Function' },
  { name: 'Reticulocyte Count', units: ['%'], normalRange: { min: 0.5, max: 2 }, category: 'Hematology' },
  { name: 'Immature Platelet Fraction', units: ['%'], normalRange: { min: 1.1, max: 6.1 }, category: 'Hematology' },
  { name: 'Osmolality, Serum', units: ['mOsm/kg'], normalRange: { min: 275, max: 295 }, category: 'Electrolytes' },
  { name: 'Osmolality, Urine', units: ['mOsm/kg'], normalRange: { min: 300, max: 900 }, category: 'Urinalysis' },
  { name: 'Anion Gap', units: ['mEq/L'], normalRange: { min: 8, max: 16 }, category: 'Electrolytes' },
  
  // Heavy Metals
  { name: 'Lead', units: ['μg/dL'], normalRange: { min: 0, max: 5 }, category: 'Heavy Metals' },
  { name: 'Mercury', units: ['μg/L'], normalRange: { min: 0, max: 10 }, category: 'Heavy Metals' },
  { name: 'Cadmium', units: ['μg/L'], normalRange: { min: 0, max: 5 }, category: 'Heavy Metals' },
  { name: 'Arsenic', units: ['μg/L'], normalRange: { min: 0, max: 10 }, category: 'Heavy Metals' },
  
  // Autoimmune Markers
  { name: 'ANA (Antinuclear Antibody)', units: ['titer'], normalRange: { min: 0, max: 0 }, category: 'Autoimmune' },
  { name: 'Anti-dsDNA', units: ['IU/mL'], normalRange: { min: 0, max: 9 }, category: 'Autoimmune' },
  { name: 'Rheumatoid Factor', units: ['IU/mL'], normalRange: { min: 0, max: 14 }, category: 'Autoimmune' },
  { name: 'Anti-CCP', units: ['U/mL'], normalRange: { min: 0, max: 20 }, category: 'Autoimmune' },
  
  // Additional Urine Ratios and Specialized Tests
  { name: 'Calcium/Creatinine Ratio, Urine', units: ['mg/mg'], normalRange: { min: 0, max: 0.2 }, category: 'Urinalysis' },
  { name: 'Oxalate/Creatinine Ratio, Urine', units: ['mg/g'], normalRange: { min: 0, max: 40 }, category: 'Urinalysis' },
  { name: 'Citrate/Creatinine Ratio, Urine', units: ['mg/g'], normalRange: { min: 250, max: 1200 }, category: 'Urinalysis' },
  { name: 'Uric Acid/Creatinine Ratio, Urine', units: ['mg/g'], normalRange: { min: 0, max: 750 }, category: 'Urinalysis' },
  { name: 'Zn/Creat, urine', units: ['μg/g'], normalRange: { min: 100, max: 600 }, category: 'Urinalysis' },
  { name: 'Zr/Creat, urine', units: ['μg/g'], normalRange: { min: 0, max: 5 }, category: 'Urinalysis' },
].sort((a, b) => a.name.localeCompare(b.name));

export const CATEGORIES = [...new Set(BIOMARKERS.map(b => b.category))].sort();
