const doctorsByService = {
  "Dermatology": [
    { name: "Dr. Anushka Perera", qualification: "MD (Dermatology), Consultant Skin Specialist", img: "img/Dr_Anushka.png" },
    { name: "Dr. Tharindu Wijesinghe", qualification: "MBBS, MD, Specialist in Cosmetic Dermatology", img: "img/Dr_Tharindu.png" },
    { name: "Dr. Nethmi Jayasuriya", qualification: "MBBS, Diploma in Clinical Dermatology (UK)", img: "img/Dr_NethmiJaya.png" }
  ],
  "Obstetrics & Gynecology": [
    { name: "Dr. Kalani Wickramasinghe", qualification: "MBBS, MD (Obstetrics & Gynaecology), Consultant OB/GYN", img: "img/Dr_Kalani.png" },
    { name: "Dr. Ishara Fernando", qualification: "MD (Reproductive Medicine), Specialist in Fertility & Maternal Health", img: "img/Dr_IsharaFer.png" },
    { name: "Dr. Chamari Abeykoon", qualification: "MBBS, DGO, Senior Consultant Gynecologist", img: "img/Dr_Chamari.png" }
  ],
  "Dental & Oral Care": [
    { name: "Dr. Ruwan De Silva", qualification: "BDS (Colombo), MDS (Oral Surgery)", img: "img/Dr_Ruwan.png" },
    { name: "Dr. Kavindi Senanayake", qualification: "BDS, Specialist in Cosmetic Dentistry & Orthodontics", img: "img/Dr_Kavindi.png" },
    { name: "Dr. Danuka Rajapaksha", qualification: "BDS, MSc (Implantology)", img: "img/Dr_Danushka.png" }
  ],
  "Gastroenterology": [
    { name: "Dr. Pradeep Samarasinghe", qualification: "MBBS, MD, Consultant Gastroenterologist", img: "img/Dr_Pradeep.png" },
    { name: "Dr. Janani Dissanayake", qualification: "MD (Internal Medicine), DM (Gastroenterology)", img: "img/Dr_Janani.png" },
    { name: "Dr. Hashan Fernando", qualification: "MBBS, MRCP (UK), Specialist in Liver & Digestive Disorders", img: "img/Dr_Hashan.png" }
  ],
  "Radiology & Imaging": [
    { name: "Dr. Amila Ranasinghe", qualification: "MBBS, MD (Radiology), Consultant Radiologist", img: "img/Dr_Amila.png" },
    { name: "Dr. Thushara Perera", qualification: "MD, Specialist in MRI & Diagnostic Imaging", img: "img/Dr_Thushara.png" },
    { name: "Dr. Hiruni Abeyratne", qualification: "MBBS, DMRD (UK), Interventional Radiologist", img: "img/Dr_Hiruni.png" }
  ],
  "Urology": [
    { name: "Dr. Mahen Bandara", qualification: "MBBS, MS (Urology), Consultant Urological Surgeon", img: "img/Dr_MahenBandara.png" },
    { name: "Dr. Isuru Weerasinghe", qualification: "MS (Surgery), Specialist in Endourology & Kidney Care", img: "img/Dr_Isuru.png" },
    { name: "Dr. Harsha Wickramathilake", qualification: "MBBS, FRCS (UK), Senior Urologist", img: "img/Dr_Harsha.png" }
  ],
  "General Surgery": [
    { name: "Dr. Kasun Jayawardena", qualification: "MBBS, MS (General Surgery), Consultant Surgeon", img: "img/Dr_Kasun.png" },
    { name: "Dr. Malshi de Alwis", qualification: "MD (Surgery), Specialist in Laparoscopic & Minimally Invasive Surgery", img: "img/Dr_Malshi.png" },
    { name: "Dr. Pahan Dias", qualification: "MBBS, FRCS (Edin), Senior General Surgeon", img: "img/Dr_Pahan.png" }
  ],
  "Pediatrics": [
    { name: "Dr. Suresh Perera", qualification: "MBBS, MD (Paediatrics), Consultant Paediatrician", img: "img/Dr_Suresh.png" },
    { name: "Dr. Minuri Gunasekara", qualification: "MD (Child Health), Specialist in Neonatal & Infant Care", img: "img/Dr_Minuri.png" },
    { name: "Dr. Tharaka Liyanage", qualification: "MBBS, DCH (UK), Consultant in Child Nutrition & Immunology", img: "img/Dr_Tharaka.png" }
  ],
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
      img: "img/Dr_Mahen.png" 
    }
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
      img: "img/Dr_Dinuli.png" 
    }
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
  ]
};

const container = document.getElementById("doctor-container");

for (const [department, doctors] of Object.entries(doctorsByService)) {
  const section = document.createElement("section");
  section.classList.add("department");
  
  section.innerHTML = `
    <h2>${department}</h2>
    <div class="doctor-grid">
      ${doctors.map(doc => `
        <div class="doctor-card">
          <img src="${doc.img}" alt="${doc.name}">
          <h4>${doc.name}</h4>
          <p>${doc.qualification}</p>
          <a href="book-appointment.html" class="book-btn">Book Appointment</a>
        </div>
      `).join('')}
    </div>
  `;
  
  container.appendChild(section);
}

//Doctor Search Functionality
const searchInput = document.getElementById("doctor-search-input");
const searchBtn = document.getElementById("doctor-search-btn");

function searchDoctor() {
  const query = searchInput.value.toLowerCase().trim();
  const allDoctors = document.querySelectorAll(".doctor-card");

  let found = false;

  allDoctors.forEach((card) => {
    const name = card.querySelector("h4").textContent.toLowerCase();
    if (name.includes(query)) {
      found = true;
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("highlight");
      setTimeout(() => card.classList.remove("highlight"), 2000);
    }
  });

  if (!found && query) {
    alert("No doctor found with that name!");
  }
}

// When clicking Search button
searchBtn.addEventListener("click", searchDoctor);

// When pressing Enter
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchDoctor();
  }
});