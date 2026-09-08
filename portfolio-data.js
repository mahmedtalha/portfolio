(() => {
  'use strict';

  const deepFreeze = (value) => {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.values(value).forEach(deepFreeze);
    return Object.freeze(value);
  };

  window.portfolioData = deepFreeze({
    version: '2026-09-08',
    profile: {
      name: 'Muhammad Ahmed Talha',
      location: 'Rahim Yar Khan, Pakistan',
      professionalIdentity: 'Cybersecurity and IT Infrastructure Professional',
      experience: '4+ years combined',
      mostRecentRole: 'IT Assistant Manager at Toyota Royal Motors (Mar 2025–Aug 2026)',
      education: {
        degree: 'BS Cyber Security',
        institution: 'The Islamia University of Bahawalpur (RYK)',
        dates: '2020–2024',
        cgpa: '3.5 / 4.0'
      },
      focus: ['Cybersecurity', 'Penetration Testing', 'Red Team Operations', 'Vulnerability Assessment',
        'IT Infrastructure', 'Network Security', 'Systems Administration', 'Security Automation'],
      openTo: ['Cybersecurity', 'Red Team', 'VAPT', 'IT Infrastructure']
    },
    links: {
      resume: 'M-Ahmed-Talha-Resume-2026.pdf',
      github: 'https://github.com/mahmedtalha',
      linkedin: 'https://linkedin.com/in/ahmedtalha470',
      contact: 'https://docs.google.com/forms/d/e/1FAIpQLScdbT_vnWj5tRU2b-XP_PdamjncAMHc3sgl6rGEUI8EHMe4QQ/viewform?usp=sharing',
      email: 'mailto:ahmedtalha470@gmail.com',
      whatsapp: 'https://wa.me/923023070227',
      phoneDisplay: '+92 302 307 0227'
    },
    statistics: {
      experience: { value: 4, suffix: '+', display: '4+ years combined', label: 'Years Combined Experience', context: 'Training, Projects & IT Operations' },
      students: { value: 3000, suffix: '+', display: '3,000+', label: 'Students Trained', context: 'Udemy & Labs' },
      workstations: { value: 350, suffix: '+', display: '350+', label: 'Workstations Managed', context: 'TRM, CSML & DevCastle BuiltinSoft' },
      tools: { value: 10, suffix: '+', display: '10+', label: 'Custom Security Tools', context: 'Python OSINT & VAPT Tools' }
    },
    skills: {
      cybersecurity: ['Penetration Testing', 'Red Teaming', 'Vulnerability Assessment (VAPT)',
        'Digital Forensics', 'OWASP Top 10', 'WAPT', 'OSINT', 'Security Auditing'],
      securityTools: ['Metasploit', 'Nmap', 'Nessus', 'OpenVAS', 'Wireshark', 'Recon-ng',
        'Aircrack-ng', 'Hashcat'],
      infrastructure: ['TCP/IP & Subnetting', 'VLANs & VPNs', 'DHCP / DNS', 'Fortinet Firewall',
        'pfSense & MikroTik', 'Active Directory', 'Group Policy (GPO)', 'Windows Server',
        'Linux System Admin', 'IP CCTV & NVR'],
      development: ['Python (Scapy/PyQt)', 'PowerShell', 'Bash Scripting', 'AWS', 'Microsoft Azure',
        'Google Cloud', 'VMware / Hyper-V', 'Splunk', 'Microsoft Sentinel', 'CrowdStrike Falcon',
        'Wazuh', 'Ghidra', 'Git & GitHub', 'Acronis Backup']
    },
    experience: [
      {
        id: 'toyota', organization: 'Toyota Royal Motors | Rahim Yar Khan', role: 'IT Assistant Manager', dates: 'Mar 2025 – Aug 2026',
        summary: 'Managed enterprise IT infrastructure, support, cloud administration, surveillance, business systems, training, and digital communications.',
        bullets: [
          'Managed IT infrastructure across three network environments, including wired and wireless networks, SQL-based Windows servers, NAS, routers, end-user devices, backup and disaster recovery, and centralized VNC support.',
          'Provided technical support for desktops, laptops, printers, and scanners, and coordinated with vendors on system upgrades and customizations.',
          'Conducted IT training and cybersecurity-awareness sessions, and managed IP CCTV, surveillance systems, and NVR infrastructure.',
          'Administered Google Workspace user provisioning, permissions, groups, policies, and security, plus Time Office attendance policies, leave, and reporting.',
          'Managed organizational social media and digital marketing, including content creation, video editing, and graphics supporting communication, branding, and visibility.'
        ]
      },
      {
        id: 'csml', organization: 'Chaudhry Sugar Mills Ltd', role: 'IT Assistant', dates: 'Sep 2024 – Mar 2025',
        summary: 'Supported network, systems, endpoints, peripherals, directory services, and firewall platforms across three weighbridges and 70+ workstations.',
        bullets: [
          'Led network and system upgrades across three weighbridges and 70+ workstations, resolved 50% of IT issues within 24 hours, and improved uptime by 10%.',
          'Supported wired and wireless infrastructure, switches, routers, Windows systems, Active Directory domain joining, Group Policy, HP printers, scanners, workstations, hardware diagnostics, cartridge troubleshooting, and preventive maintenance.',
          'Supported Windows, pfSense, MikroTik, Fortinet, and NETGATE environments, and documented configurations, incidents, and resolutions.'
        ]
      },
      {
        id: 'itsolera', organization: 'ITSOLERA PVT LTD', role: 'Internship Trainee (Cybersecurity)', dates: 'Jun 2024 – Sep 2024',
        summary: 'Performed web application penetration testing, vulnerability assessment, Red Team exercises, security documentation, and automation while leading Team Zeta.',
        bullets: [
          'Conducted web application penetration testing and vulnerability assessments using industry-standard security tools and methodologies.',
          'Led Team Zeta during Red Team exercises and security testing, documenting findings, business risks, and actionable remediation guidance.',
          'Developed Python and Bash tools for OSINT, metadata extraction, reconnaissance, and automated security analysis.'
        ]
      },
      { id: 'prodigy', organization: 'Prodigy InfoTech', role: 'Cybersecurity Project Intern', dates: '2024', summary: 'Developed controlled-lab Python tools for image encryption, packet analysis, and endpoint keystroke telemetry.' },
      { id: 'codealpha', organization: 'CodeAlpha', role: 'Project Experience', dates: '2024', summary: 'Completed Python and cybersecurity-focused project work as part of additional technical experience.' },
      { id: 'devcastle', organization: 'DevCastle BuiltinSoft', role: 'IT Administration', dates: '2024', summary: 'Managed IT support, computer-lab operations, network configuration, and office administration for a software house.' },
      {
        id: 'navttc', organization: 'NAVTTC, IUB-RYK Campus', role: 'Teaching Assistant (Cybersecurity)', dates: 'Mar 2022',
        summary: 'Facilitated practical cybersecurity training and mentored 50+ students.',
        bullets: [
          'Facilitated the NAVTTC cybersecurity program with hands-on instruction in vulnerability assessment and penetration testing, network scanning, system exploitation, and malware analysis.',
          'Mentored 50+ students in security tools, penetration-testing techniques, professional practices, and assessment methodologies.'
        ]
      },
      {
        id: 'udemy', organization: 'Udemy Platform', role: 'Course Instructor', dates: 'May 2021 – May 2024',
        summary: 'Developed and delivered 30+ CEH v11 modules and practical labs for 3,000+ enrolled students.',
        bullets: [
          'Developed and delivered 30+ hands-on CEH v11 modules and virtual labs for 3,000+ enrolled students.',
          'Taught practical topics including SQL injection, wireless security, reconnaissance, network sniffing, and denial-of-service mitigation.'
        ]
      }
    ],
    projects: [
      { id: 'info-gathering', name: 'Information Gathering Framework', aliases: ['information gathering', 'info gathering'], featured: true, categories: ['vapt', 'osint', 'network'], technologies: ['Python', 'Nmap', 'Masscan', 'OpenVAS', 'OSINT'], description: 'A unified Python assessment workflow for domain and IP intelligence, enumeration, port scanning, and OSINT.', repositories: [{ label: 'Source', url: 'https://github.com/mahmedtalha/info-gathering' }] },
      { id: 'user-finder', name: 'User Finder Zeta – OSINT Scanner', aliases: ['user finder', 'username finder'], featured: true, categories: ['osint', 'development'], technologies: ['Python', 'Multithreading', 'OSINT', 'API Scraping'], description: 'A multithreaded OSINT scanner that checks public username and email presence across platforms and produces structured reports.', repositories: [{ label: 'Source', url: 'https://github.com/mahmedtalha/user-finder' }] },
      { id: 'metadata-extractor', name: 'Zeta Metadata & OSINT Extractor', aliases: ['metadata', 'metadata extractor'], featured: true, categories: ['osint', 'forensics', 'development'], technologies: ['Python', 'EXIF', 'PDF/DOCX', 'Digital Forensics'], description: 'A multi-format utility that extracts metadata from PDF, DOCX, and image files for authorized OSINT and risk reviews.', repositories: [{ label: 'Source', url: 'https://github.com/mahmedtalha/meta-data-extractor-zeta' }] },
      { id: 'wifi-deauth', name: 'Wi-Fi Deauth Detector NodeMCU', aliases: ['deauth', 'wifi detector', 'wi-fi detector', 'nodemcu'], featured: true, categories: ['network', 'development'], technologies: ['NodeMCU ESP8266', 'C++', '802.11', 'Embedded Systems'], description: 'An ESP8266 defensive monitoring device that detects IEEE 802.11 deauthentication activity and alerts administrators.', repositories: [{ label: 'Source', url: 'https://github.com/mahmedtalha/WiFiDeauthDetectorNodeMCU' }] },
      { id: 'watermark-remover', name: 'AI Video & Image Watermark Remover Pro', aliases: ['watermark', 'watermark remover', 'florence'], featured: false, categories: ['development'], technologies: ['Python', 'Florence-2', 'LaMA AI', 'PyQt GUI'], description: 'A desktop GUI integrating vision models for object detection, segmentation, and AI-assisted media processing.', repositories: [{ label: 'Source', url: 'https://github.com/mahmedtalha/AI-Video-Watermark-Remover-Pro' }] },
      { id: 'slowloris', name: 'Slowloris Advanced DoS Simulator', aliases: ['slowloris', 'dos simulator'], featured: false, categories: ['vapt', 'network', 'development'], technologies: ['Python', 'Socket Programming', 'DoS Simulation', 'Load Testing'], description: 'An authorized controlled-lab simulator for evaluating web-server connection resilience and socket handling.', repositories: [{ label: 'Source', url: 'https://github.com/mahmedtalha/slowlorisAdvancedVersion' }] },
      { id: 'detectors', name: 'Live Website & Proxy Detectors', aliases: ['website detector', 'ssl checker', 'proxy detector', 'proxy checker'], featured: false, categories: ['network', 'vapt', 'development'], technologies: ['Python', 'Async IO', 'Multithreading', 'SSL & Proxy Audit'], description: 'Network utilities for validating HTTP/HTTPS targets, certificates, response codes, active proxies, and connection latency.', repositories: [{ label: 'Website Detector', url: 'https://github.com/mahmedtalha/live-website-detector' }, { label: 'Proxy Detector', url: 'https://github.com/mahmedtalha/live-proxy-detector' }] },
      { id: 'prodigy-suite', name: 'Prodigy Cyber Security Research Suite', aliases: ['prodigy', 'packet sniffer', 'keystroke telemetry', 'image encryption'], featured: false, categories: ['network', 'forensics', 'development'], technologies: ['Python', 'Scapy', 'Cryptography', 'Endpoint Security'], description: 'An authorized lab collection containing packet analysis, endpoint telemetry, and pixel-based image cryptography projects.', repositories: [{ label: 'Packet Sniffer', url: 'https://github.com/mahmedtalha/PRODIGY_CS_05_packet_sniffer' }, { label: 'Endpoint Telemetry', url: 'https://github.com/mahmedtalha/PRODIGY_CS_04_keylogger' }, { label: 'Image Encryption', url: 'https://github.com/mahmedtalha/PRODIGY_CS_02_Pixel_Manipulation_Image_Encryption' }] }
    ],
    certifications: [
      { id: 'degree', name: 'BS Cyber Security', issuer: 'Islamia University of Bahawalpur (RYK)', detail: 'CGPA: 3.5 / 4.0 | 2020 – 2024' },
      { id: 'navttc-cert', name: 'Certificate in Cyber Security', issuer: 'NAVTTC Govt. Pakistan', detail: 'Mar 2022 – Dec 2022' },
      { id: 'offensive-pt', name: 'Offensive Penetration Testing', issuer: 'Cybrary.com', detail: '15 hours | Dec 3, 2020' },
      { id: 'advanced-pt', name: 'Advanced Penetration Testing', issuer: 'Cybrary.com', detail: '15 hours | Dec 4, 2020' },
      { id: 'isc2-cc', name: 'Certified in Cybersecurity (CC) Training', issuer: '(ISC)²', detail: 'Official self-paced training | Jun 12, 2023' },
      { id: 'ehe', name: 'Ethical Hacking Essentials', issuer: 'Code Red | EC-Council', detail: 'Fundamental Pen-Testing Credential' },
      { id: 'mobile-security', name: 'Mobile App Security', issuer: 'Cybrary.com', detail: '2 hours | Dec 4, 2020' },
      { id: 'crisc', name: 'CRISC Exam Preparation Training', issuer: 'Cybrary.com', detail: '7 hours | Dec 4, 2020' },
      { id: 'intro-it-cyber', name: 'Introduction to IT & Cybersecurity', issuer: 'Cybrary.com', detail: '5 hours | Dec 4, 2020' },
      { id: 'itil', name: 'ITIL Foundations', issuer: 'Cybrary.com', detail: '4 hours | Dec 4, 2020' },
      { id: 'cisco-makeover', name: 'CISCO IT Security Makeover', issuer: 'Cybrary.com', detail: '1 hour | Dec 5, 2020' },
      { id: 'tor', name: 'How to Use TOR (BSWJ)', issuer: 'Cybrary.com', detail: '1 hour | Dec 3, 2020' },
      { id: 'wordpress', name: 'WordPress', issuer: 'DigiSkills.pk', detail: 'Batch 10 | Jun – Sep 2021' },
      { id: 'freelancing', name: 'Freelancing', issuer: 'DigiSkills.pk', detail: 'Batch 10 | Jun – Sep 2021' },
      { id: 'word', name: 'Microsoft Word Training', issuer: 'Eduonix', detail: 'Document & Office Automation' }
    ],
    speaking: {
      event: 'BZU Multan CIT Conference', date: 'Aug 2026', role: 'Cyber Security Panelist & Speaker',
      topics: ['AI-enhanced cyber threats', 'quantum-computing risks', 'password and hash cracking', 'human-firewall strategies', 'digital defense']
    }
  });
})();
