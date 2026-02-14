  const servicesInfo = {
  "Cardiology": `At MediCare+ Cardiology, we believe that every heartbeat matters. Our department is equipped with the latest advancements 
  in cardiovascular medicine, offering everything from preventive screenings and cardiac imaging to interventional procedures and post-treatment
  rehabilitation. Our team of dedicated cardiologists and nurses provide compassionate, round-the-clock care for patients suffering from heart 
  disease, hypertension, arrhythmias, and more. 
  <br/><br/>
  Whether you're visiting us for a simple check-up or undergoing a complex surgery, our mission is to ensure your heart receives the attention 
  and expertise it deserves. With personalized treatment plans, advanced cardiac catheterization labs, and emergency response teams, we're here 
  to help your heart beat stronger — for life.`,

  "Oncology": `The MediCare+ Oncology Center is a place of hope, strength, and healing. Our multidisciplinary team of oncologists, radiologists, 
  and nurses work hand in hand to deliver evidence-based, patient-centered cancer care. 
  <br><br>
  We offer a complete range of services — from early detection and diagnostic imaging to chemotherapy, immunotherapy, radiation therapy, and 
  palliative support. Each patient's treatment plan is tailored to their unique medical and emotional needs, ensuring comfort and dignity 
  throughout the healing journey. 
  <br><br>
  At MediCare+, we understand that fighting cancer is not just a medical challenge — it's an emotional one. That's why we provide counseling, 
  nutrition support, and continuous monitoring to help patients and their families find strength, one day at a time.`,

  "Neurology": `The MediCare+ Neurology Department focuses on the complex and delicate nature of the human nervous system. Our specialists 
  diagnose and treat a wide range of neurological disorders including migraines, epilepsy, stroke, multiple sclerosis, Parkinson's disease, 
  and other neurodegenerative conditions. 
  <br><br>
  We are equipped with advanced neuroimaging and electrophysiology technology to ensure accurate diagnosis and effective management. Our 
  neurologists work closely with rehabilitation experts to support long-term recovery and cognitive improvement. 
  <br><br>
  With a patient-first approach, we aim not only to treat symptoms but to restore confidence, functionality, and quality of life for those 
  affected by neurological challenges.`,

  "Orthopedics": `MediCare+ Orthopedics combines expert care with modern technology to keep your bones, joints, and muscles healthy. We provide 
  comprehensive care for fractures, sports injuries, arthritis, spinal disorders, and joint replacements. 
  <br><br>
  Our orthopedic surgeons are skilled in both surgical and non-surgical treatments, supported by physiotherapists and rehabilitation specialists 
  to promote faster recovery and long-term mobility. 
  <br><br>
  Whether you're a young athlete recovering from injury or a senior regaining movement, we focus on improving your comfort, flexibility, and 
  independence — step by step.`,

  "Dermatology": `Your skin is a reflection of your health, and at MediCare+ Dermatology, we help it glow with confidence. Our department offers 
  treatment for a variety of skin conditions such as acne, eczema, psoriasis, fungal infections, and pigmentation disorders. 
  <br><br>
  We also specialize in aesthetic and cosmetic dermatology — including laser therapy, chemical peels, anti-aging treatments, and scar removal. 
  Every patient receives a personalized skin-care plan that combines medical precision with modern beauty science. 
  <br><br>
  Because when you feel good in your skin, it shows — inside and out.`,

  "Obstetrics & Gynecology": `The MediCare+ Obstetrics & Gynecology Department is dedicated to women's health across all stages of life. 
  From adolescence and pregnancy to menopause and beyond, our specialists ensure comprehensive care for every woman. 
  <br><br>
  Our maternity wing offers world-class prenatal and postnatal services, labor management, and family planning guidance. We also provide fertility 
  treatments, laparoscopic surgeries, and preventive screenings for gynecological conditions. 
  <br><br>
  Our mission is to create a nurturing and safe environment for women — where care is delivered with expertise, empathy, and respect.`,

  "Dental & Oral Care": `At MediCare+ Dental and Oral Care, we make healthy smiles our top priority. Our dental professionals provide everything 
  from preventive dental checkups and fillings to root canal therapy, orthodontics, and oral surgery. 
  <br><br>
  We use modern equipment and gentle techniques to ensure pain-free treatments in a comfortable setting. Cosmetic services like teeth whitening, 
  veneers, and smile makeovers are also available to enhance your confidence. 
  <br><br>
  Because we believe a bright smile isn't just about beauty — i's about overall well-being.`,

  "Gastroenterology": `The MediCare+ Gastroenterology Department offers advanced diagnostic and therapeutic services for digestive system 
  disorders. We treat conditions like gastritis, ulcers, liver disease, pancreatitis, and irritable bowel syndrome using modern endoscopic 
  and laparoscopic technologies. 
  <br><br>
  Our specialists focus on preventive care through dietary guidance and early screenings for gastrointestinal cancers. We believe digestive 
  health is the foundation of overall wellness, and our personalized approach ensures patients receive care that's effective, respectful, and lasting.`,

  "Radiology & Imaging": `Our Radiology & Imaging Department is the backbone of diagnostic medicine at MediCare+. We use high-precision 
  equipment — including MRI, CT, X-ray, and ultrasound — to provide clear, detailed images that guide accurate diagnosis and effective treatment. 
  <br><br>
  Our radiologists collaborate closely with physicians from every department, ensuring each scan is interpreted with expertise and care. 
  Fast results, minimal radiation exposure, and advanced imaging quality make MediCare+ the trusted choice for diagnostic accuracy.`,

  "Urology": `MediCare+ Urology provides expert care for conditions affecting the kidneys, bladder, urinary tract, and male reproductive 
  system. Our specialists perform minimally invasive surgeries for kidney stones, prostate disorders, and urinary infections with precision 
  and compassion. 
  <br><br>
  Using state-of-the-art technology, we focus on restoring comfort and normal urinary function while maintaining patient privacy and dignity. 
  From routine evaluations to complex procedures, we deliver urological care that's both advanced and understanding.`,

  "General Surgery": `The General Surgery Department at MediCare+ is home to a team of experienced surgeons who handle a wide range of 
  procedures, from minor day surgeries to complex abdominal, thyroid, and trauma operations. 
  <br><br>
  Our operation theatres are equipped with modern anesthetic and monitoring systems to ensure maximum safety. Every procedure is 
  followed by attentive post-operative care designed to speed recovery and reduce discomfort. 
  <br><br>
  Our approach is simple: precise surgery, compassionate recovery, and complete patient trust.`,

  "Pediatrics": `At MediCare+ Pediatrics, we treat every child with the same care and attention we'd give our own. Our pediatricians 
  provide complete healthcare for infants, children, and adolescents — including vaccinations, developmental monitoring, and treatment 
  for acute or chronic illnesses. 
  <br><br>
  With a focus on gentle care and communication, our team ensures that both parents and children feel safe and understood. We also offer 
  guidance on nutrition, growth, and emotional well-being, supporting families as they raise the next generation of healthy, happy kids.`
};
const doctorsByService = {
  "Cardiology": [
    { 
      name: "Dr. Arjun Adheera", 
      qualification: "MBBS, MD (Cardiology)", 
      img: "img/founder-Dr.jpeg" 
    },
    { 
      name: "Dr. Nethmi Perera", 
      qualification: "MBBS, MD (Internal Medicine)", 
      img: "img/Dr_Nethmi.png" 
    },
    { 
      name: "Dr. Shan Silva", 
      qualification: "MD, FACC (Cardiology Specialist)", 
      img: "img/Dr_Shan.png" 
    }
  ],
  "Oncology": [
    { 
      name: "Dr. Ishara Dissanayake", 
      qualification: "MBBS, MD, Consultant Oncologist", 
      img: "img/Dr_Ishara.png" 
    },
    { 
      name: "Dr. Mahen Rodrigo", 
      qualification: "MBBS, MRCP, Clinical Oncologist", 
      img: "img/Dr_Mahen.png" }
  ],
  "Neurology": [
    { 
      name: "Dr. Ravindu Jayasooriya", 
      qualification: "MBBS, MD (Neurology)", 
      img: "img/Dr_Ravindu.png" 
    },
    { 
      name: "Dr. Dinuli Samarasinghe", 
      qualification: "MBBS, DM (Neurophysiology)", 
      img: "img/DR_Dinuli.png" }
  ],
  "Orthopedics": [
    { 
      name: "Dr. Hiran Abeysekera", 
      qualification: "MBBS, MS (Orthopedics)", 
      img: "img/Dr_Hiran.png" 
    },
    { 
      name: "Dr. Sudeepa Fernando", 
      qualification: "MBBS, MD (Trauma Surgery)", 
      img: "img/Dr_Sudeepa.png" 
    }
  ],
  "Dermatology": [
  {
    name: "Dr. Anushka Perera",
    qualification: "MD (Dermatology), Consultant Skin Specialist",
    img: "img/Dr_Anushka.png"
  },
  {
    name: "Dr. Tharindu Wijesinghe",
    qualification: "MBBS, MD, Specialist in Cosmetic Dermatology",
    img: "img/Dr_Tharindu.png"
  },
  {
    name: "Dr. Nethmi Jayasuriya",
    qualification: "MBBS, Diploma in Clinical Dermatology (UK)",
    img: "img/Dr_NethmiJaya.png"
  }
],

  "Obstetrics & Gynecology": [
  {
    name: "Dr. Kalani Wickramasinghe",
    qualification: "MBBS, MD (Obstetrics & Gynaecology), Consultant OB/GYN",
    img: "img/Dr_Kalani.png"
  },
  {
    name: "Dr. Ishara Fernando",
    qualification: "MD (Reproductive Medicine), Specialist in Fertility & Maternal Health",
    img: "img/Dr_IsharaFer.png"
  },
  {
    name: "Dr. Chamari Abeykoon",
    qualification: "MBBS, DGO, Senior Consultant Gynecologist",
    img: "img/Dr_Chamari.png"
  }
],
  "Dental & Oral Care": [
  {
    name: "Dr. Ruwan De Silva",
    qualification: "BDS (Colombo), MDS (Oral Surgery)",
    img: "img/Dr_Ruwan.png"
  },
  {
    name: "Dr. Kavindi Senanayake",
    qualification: "BDS, Specialist in Cosmetic Dentistry & Orthodontics",
    img: "img/Dr_Kavindi.png"
  },
  {
    name: "Dr. Danuka Rajapaksha",
    qualification: "BDS, MSc (Implantology)",
    img: "img/Dr_Danushka.png"
  }
],

  "Gastroenterology": [
  {
    name: "Dr. Pradeep Samarasinghe",
    qualification: "MBBS, MD, Consultant Gastroenterologist",
    img: "img/Dr_Pradeep.png"
  },
  {
    name: "Dr. Janani Dissanayake",
    qualification: "MD (Internal Medicine), DM (Gastroenterology)",
    img: "img/Dr_Janani.png"
  },
  {
    name: "Dr. Hashan Fernando",
    qualification: "MBBS, MRCP (UK), Specialist in Liver & Digestive Disorders",
    img: "img/Dr_Hashan.png"
  }
],

  "Radiology & Imaging": [
  {
    name: "Dr. Amila Ranasinghe",
    qualification: "MBBS, MD (Radiology), Consultant Radiologist",
    img: "img/Dr_Amila.png"
  },
  {
    name: "Dr. Thushara Perera",
    qualification: "MD, Specialist in MRI & Diagnostic Imaging",
    img: "img/Dr_Thushara.png"
  },
  {
    name: "Dr. Hiruni Abeyratne",
    qualification: "MBBS, DMRD (UK), Interventional Radiologist",
    img: "img/Dr_Hiruni.png"
  }
],

  "Urology": [
  {
    name: "Dr. Mahen Bandara",
    qualification: "MBBS, MS (Urology), Consultant Urological Surgeon",
    img: "img/Dr_MahenBandara.png"
  },
  {
    name: "Dr. Isuru Weerasinghe",
    qualification: "MS (Surgery), Specialist in Endourology & Kidney Care",
    img: "img/Dr_Isuru.png"
  },
  {
    name: "Dr. Harsha Wickramathilake",
    qualification: "MBBS, FRCS (UK), Senior Urologist",
    img: "img/Dr_Harsha.png"
  }
],

  "General Surgery": [
  {
    name: "Dr. Kasun Jayawardena",
    qualification: "MBBS, MS (General Surgery), Consultant Surgeon",
    img: "img/Dr_Kasun.png"
  },
  {
    name: "Dr. Malshi de Alwis",
    qualification: "MD (Surgery), Specialist in Laparoscopic & Minimally Invasive Surgery",
    img: "img/Dr_Malshi.png"
  },
  {
    name: "Dr. Pahan Dias",
    qualification: "MBBS, FRCS (Edin), Senior General Surgeon",
    img: "img/Dr_Pahan.png"
  }
  ],
  "Pediatrics": [
  {
    name: "Dr. Suresh Perera",
    qualification: "MBBS, MD (Paediatrics), Consultant Paediatrician",
    img: "img/Dr_Suresh.png"
  },
  {
    name: "Dr. Minuri Gunasekara",
    qualification: "MD (Child Health), Specialist in Neonatal & Infant Care",
    img: "img/Dr_Minuri.png"
  },
  {
    name: "Dr. Tharaka Liyanage",
    qualification: "MBBS, DCH (UK), Consultant in Child Nutrition & Immunology",
    img: "img/Dr_Tharaka.png"
  }
]};

const readMoreBtns = document.querySelectorAll(".read-more");
const serviceOverlay = document.getElementById("service-overlay");
const closeService = document.getElementById("close-service");
const title = document.getElementById("service-title");
const desc = document.getElementById("service-description");

  
  readMoreBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
  
    const serviceName = btn.closest(".service-card").querySelector("h3").textContent.trim();
    title.textContent = serviceName;
    desc.innerHTML = servicesInfo[serviceName] || "Description not found.";
    serviceOverlay.classList.add("active");       
    showDoctors(serviceName);
    document.body.style.overflow = "hidden";      
  });
});

if (closeService) {
  closeService.addEventListener("click", () => {
    serviceOverlay.classList.remove("active");
    document.body.style.overflow = "";           
  });
}

  serviceOverlay.addEventListener("click", (e) => {
  
  if (e.target === serviceOverlay) {
    serviceOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

  function showDoctors(serviceName) {
  const doctorsSection = document.getElementById("doctors-section");
  const doctorsTitle = document.getElementById("doctors-title");
  const doctorsGrid = document.getElementById("doctors-grid");

  const doctors = doctorsByService[serviceName];
  if (!doctors) {
    doctorsSection.style.display = "none";
    return;
  }

  doctorsSection.style.display = "block";
  doctorsTitle.textContent = `Our ${serviceName} Specialists`;

  doctorsGrid.innerHTML = doctors.map(doc => `
    <div class="doctor-card">
      <img src="${doc.img}" alt="${doc.name}">
      <div class="doctor-info">
        <h4>${doc.name}</h4>
        <p>${doc.qualification}</p>
       <a href="book-appointment.html" class="book-btn">Book Appointment</a>

      </div>
    </div>
  `).join("");
}

