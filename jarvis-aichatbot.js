(() => {
  'use strict';

  const PORTFOLIO_KNOWLEDGE = window.portfolioData;
  if (!PORTFOLIO_KNOWLEDGE) throw new Error('Shared portfolio data is unavailable.');

  const JARVIS_URLS = Object.freeze({
    about: '#about',
    skills: '#skills',
    projects: '#projects',
    experience: '#experience',
    speaking: '#speaking',
    certifications: '#certifications',
    contactSection: '#contact',
    ...PORTFOLIO_KNOWLEDGE.links
  });

  const action = (label, url, icon = 'fa-arrow-right') => ({ label, url, icon });

  const normalize = (value) => value.toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '').replace(/[^a-z0-9+#.\-/\s]/g, ' ').replace(/\s+/g, ' ').trim();

  const includesAny = (text, phrases) => phrases.some((phrase) => text.includes(normalize(phrase)));
  const containsTerm = (text, term) => {
    const escaped = normalize(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(?:^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`).test(text);
  };
  const response = (answer, actions = []) => ({ answer, actions });
  const formatList = (items) => items.join(', ').replace(/, ([^,]*)$/, ', and $1');
  const primaryRepository = (project) => project.repositories?.[0]?.url || JARVIS_URLS.github;

  class LocalPortfolioProvider {
    constructor(knowledge) {
      this.knowledge = knowledge;
    }

    async respond(question) {
      const q = normalize(question);
      const projects = this.knowledge.projects;
      const experience = new Map(this.knowledge.experience.map((item) => [item.id, item]));
      const stats = this.knowledge.statistics;

      if (!q) return response('Please enter a question about Muhammad Ahmed Talha’s portfolio.');

      if (/^(?:hello|hi|hey|salam|assalam|good morning|good evening)(?:\s|$)/.test(q)) {
        return response('Hello. I’m JARVIS, Muhammad Ahmed Talha’s AI portfolio assistant. What would you like to explore?', [
          action('About Muhammad', JARVIS_URLS.about, 'fa-user'),
          action('View Projects', JARVIS_URLS.projects, 'fa-code-branch')
        ]);
      }

      const project = projects.find((item) => item.aliases.some((alias) => q.includes(normalize(alias))));
      if (project && includesAny(q, ['project', 'tool', 'built', 'repository', 'repo', ...project.aliases])) {
        return response(`${project.name}: ${project.description}`, [
          action('Open Repository', primaryRepository(project), 'fa-brands fa-github'),
          action('View Projects', JARVIS_URLS.projects, 'fa-code-branch')
        ]);
      }

      if (includesAny(q, ['current work', 'currently work', 'current role', 'current job', 'where does he work',
        'where is he working', 'employer now', 'toyota royal', 'toyota'])) {
        const role = experience.get('toyota');
        return response(`${role.role} — ${role.organization} (${role.dates}). ${role.summary}`, [
          action('View Experience', JARVIS_URLS.experience, 'fa-briefcase')
        ]);
      }

      if (includesAny(q, ['sugar mill', 'chaudhry sugar', 'csml'])) {
        const role = experience.get('csml');
        return response(`${role.role} — ${role.organization} (${role.dates}). ${role.summary}`, [
          action('View Experience', JARVIS_URLS.experience, 'fa-briefcase')
        ]);
      }

      if (includesAny(q, ['itsolera', 'team zeta', 'internship'])) {
        const role = experience.get('itsolera');
        return response(`${role.role} — ${role.organization} (${role.dates}). ${role.summary}`, [
          action('View Experience', JARVIS_URLS.experience, 'fa-briefcase'),
          action('View Projects', JARVIS_URLS.projects, 'fa-code-branch')
        ]);
      }

      if (includesAny(q, ['udemy', 'teaching', 'teacher', 'instructor', 'trained', 'students', 'mentored', 'training'])) {
        const udemy = experience.get('udemy');
        const navttc = experience.get('navttc');
        return response(`${udemy.role} — ${udemy.organization} (${udemy.dates}): ${udemy.summary} ${navttc.role} — ${navttc.organization} (${navttc.dates}): ${navttc.summary}`, [
          action('View Experience', JARVIS_URLS.experience, 'fa-chalkboard-teacher')
        ]);
      }

      if (includesAny(q, ['prodigy infotech', 'codealpha', 'devcastle', 'python developer'])) {
        const roles = ['prodigy', 'codealpha', 'devcastle'].map((id) => experience.get(id));
        return response(`Additional technical experience in 2024:\n${roles.map((role) => `• ${role.organization} — ${role.role}: ${role.summary}`).join('\n')}`, [
          action('View Experience', JARVIS_URLS.experience, 'fa-briefcase'),
          action('GitHub', JARVIS_URLS.github, 'fa-brands fa-github')
        ]);
      }

      if (includesAny(q, ['osint project', 'osint projects', 'reconnaissance project', 'reconnaissance tools'])) {
        const osintProjects = projects.filter((item) => item.categories.includes('osint'));
        return response(`Muhammad’s OSINT-focused projects are ${formatList(osintProjects.map((item) => item.name))}. Together they cover public-footprint checks, domain/IP reconnaissance, port scanning, and document/image metadata extraction.`, [
          action('View Projects', JARVIS_URLS.projects, 'fa-code-branch'),
          action('GitHub', JARVIS_URLS.github, 'fa-brands fa-github')
        ]);
      }

      if (includesAny(q, ['project', 'projects', 'portfolio work', 'what has he built', 'what did he build', 'repositories'])) {
        const featured = projects.filter((item) => item.featured).map((item) => `• ${item.name}`).join('\n');
        const additional = projects.filter((item) => !item.featured).map((item) => `• ${item.name}`).join('\n');
        return response(`Featured work:\n${featured}\n\nAdditional projects:\n${additional}`, [
          action('View Projects', JARVIS_URLS.projects, 'fa-code-branch'),
          action('GitHub', JARVIS_URLS.github, 'fa-brands fa-github')
        ]);
      }

      if (includesAny(q, ['osint', 'open source intelligence', 'reconnaissance'])) {
        const osintProjects = projects.filter((item) => item.categories.includes('osint'));
        return response(`OSINT is a recurring part of Muhammad’s security work. Relevant projects include ${formatList(osintProjects.map((item) => item.name))}. At ITSOLERA, he also worked on automated reconnaissance and metadata extraction.`, [
          action('View Projects', JARVIS_URLS.projects, 'fa-code-branch'),
          action('GitHub', JARVIS_URLS.github, 'fa-brands fa-github')
        ]);
      }

      if (includesAny(q, ['certification', 'certifications', 'certificate', 'certified', 'isc2', 'isc 2', 'cybrary'])) {
        const credentials = this.knowledge.certifications.map((item) => `• ${item.name} — ${item.issuer}`).join('\n');
        return response(`Education, certificates, and training listed in the portfolio include:\n${credentials}`, [
          action('View Certifications', JARVIS_URLS.certifications, 'fa-certificate')
        ]);
      }

      if (includesAny(q, ['education', 'degree', 'university', 'cgpa', 'studied', 'graduate', 'bachelor'])) {
        const education = this.knowledge.profile.education;
        const navttcCertificate = this.knowledge.certifications.find((item) => item.id === 'navttc-cert');
        return response(`Muhammad earned a ${education.degree} from ${education.institution} (${education.dates}), with a CGPA of ${education.cgpa}. He also completed ${navttcCertificate.name} through ${navttcCertificate.issuer} (${navttcCertificate.detail}).`, [
          action('About Muhammad', JARVIS_URLS.about, 'fa-user'),
          action('Certifications', JARVIS_URLS.certifications, 'fa-certificate')
        ]);
      }

      if (includesAny(q, ['speaker', 'speaking', 'panelist', 'conference', 'bzu', 'panel'])) {
        const speaking = this.knowledge.speaking;
        return response(`Muhammad was a ${speaking.role} at the ${speaking.event} in ${speaking.date}. Topics included ${formatList(speaking.topics)}.`, [
          action('View Speaking', JARVIS_URLS.speaking, 'fa-comments')
        ]);
      }

      if (includesAny(q, ['resume', 'cv', 'curriculum vitae', 'download'])) {
        return response('Certainly. You can open or download Muhammad Ahmed Talha’s 2026 resume using the button below.', [
          action('Download Resume', JARVIS_URLS.resume, 'fa-file-arrow-down')
        ]);
      }

      if (includesAny(q, ['hire', 'hiring', 'contact', 'email', 'phone', 'whatsapp', 'reach him', 'reach out',
        'career opportunity', 'career opportunities', 'job opportunity', 'available for work', 'open to work', 'open to jobs'])) {
        const availability = includesAny(q, ['available for work', 'open to work', 'open to jobs', 'job opportunity']);
        const lead = availability
          ? `Yes. Muhammad’s portfolio states that he is open to full-time ${formatList(this.knowledge.profile.openTo)} opportunities. You can reach him through the contact form, email, WhatsApp, or LinkedIn.`
          : `You can contact Muhammad in ${this.knowledge.profile.location} by email at ${this.knowledge.links.email.replace('mailto:', '')}, WhatsApp at ${this.knowledge.links.phoneDisplay}, LinkedIn, or the contact form.`;
        return response(lead, [
          action('Contact Muhammad', JARVIS_URLS.contact, 'fa-paper-plane'),
          action('Email', JARVIS_URLS.email, 'fa-envelope'),
          action('WhatsApp', JARVIS_URLS.whatsapp, 'fa-brands fa-whatsapp'),
          action('LinkedIn', JARVIS_URLS.linkedin, 'fa-brands fa-linkedin')
        ]);
      }

      if (includesAny(q, ['github', 'source code', 'code profile'])) {
        return response('Muhammad’s GitHub profile contains his cybersecurity, OSINT, Python, networking, and security-research projects.', [
          action('Open GitHub', JARVIS_URLS.github, 'fa-brands fa-github'),
          action('View Projects', JARVIS_URLS.projects, 'fa-code-branch')
        ]);
      }

      if (includesAny(q, ['linkedin', 'professional profile'])) {
        return response('You can view Muhammad’s professional profile and connect with him on LinkedIn.', [
          action('Open LinkedIn', JARVIS_URLS.linkedin, 'fa-brands fa-linkedin')
        ]);
      }

      if (includesAny(q, ['how many', 'statistics', 'stats', 'numbers', 'years experience', 'workstations managed', 'custom tools'])) {
        return response(`Portfolio highlights:\n• ${stats.experience.display} across training, projects, penetration testing, and enterprise IT operations\n• ${stats.students.display} students trained\n• ${stats.workstations.display} workstations managed across ${stats.workstations.context}\n• ${stats.tools.display} custom security tools`, [
          action('About Muhammad', JARVIS_URLS.about, 'fa-user')
        ]);
      }

      const allSkillGroups = Object.values(this.knowledge.skills);
      const matchedTool = allSkillGroups.flat().find((tool) => containsTerm(q, tool));
      if (matchedTool) {
        return response(`Yes. ${matchedTool} is explicitly listed in Muhammad’s portfolio. I don’t infer a specific client engagement or proficiency level beyond the supplied portfolio data.`, [
          action('View Skills', JARVIS_URLS.skills, 'fa-shield-halved')
        ]);
      }

      if (includesAny(q, ['red team', 'red teaming', 'offensive security'])) {
        return response('Yes. Red Team operations are part of Muhammad’s professional focus. At ITSOLERA, he conducted Red Team work, web application penetration testing, vulnerability assessments, risk documentation, remediation recommendations, and led Team Zeta.', [
          action('View Experience', JARVIS_URLS.experience, 'fa-briefcase'),
          action('View Skills', JARVIS_URLS.skills, 'fa-shield-halved')
        ]);
      }

      if (includesAny(q, ['penetration test', 'penetration testing', 'pentest', 'wapt', 'vapt', 'vulnerability'])) {
        return response('Muhammad’s portfolio lists penetration testing, WAPT, VAPT, vulnerability assessment, OWASP Top 10, security auditing, and Red Teaming. His ITSOLERA experience included web application assessments, risk documentation, and remediation recommendations; he also taught hands-on VAPT topics.', [
          action('View Skills', JARVIS_URLS.skills, 'fa-shield-halved'),
          action('View Experience', JARVIS_URLS.experience, 'fa-briefcase')
        ]);
      }

      if (includesAny(q, ['network', 'networking', 'infrastructure', 'system administration', 'sysadmin', 'firewall'])) {
        return response(`Muhammad’s listed networking and infrastructure skills include ${formatList(this.knowledge.skills.infrastructure)}. His Toyota and CSML roles included managing production networks and end-user systems.`, [
          action('View Skills', JARVIS_URLS.skills, 'fa-network-wired'),
          action('View Experience', JARVIS_URLS.experience, 'fa-briefcase')
        ]);
      }

      if (includesAny(q, ['python', 'scripting', 'automation', 'programming', 'developer'])) {
        return response(`Muhammad’s listed scripting and technology exposure includes ${formatList(this.knowledge.skills.development)}. His projects apply these technologies to OSINT, reconnaissance, metadata extraction, packet analysis, and desktop applications.`, [
          action('View Projects', JARVIS_URLS.projects, 'fa-code-branch'),
          action('View Skills', JARVIS_URLS.skills, 'fa-code')
        ]);
      }

      if (includesAny(q, ['skills', 'specialize', 'specialise', 'expertise', 'technologies', 'tech stack', 'tools does he know'])) {
        const skills = this.knowledge.skills;
        return response(`Cybersecurity: ${formatList(skills.cybersecurity)}.\n\nSecurity tools: ${formatList(skills.securityTools)}.\n\nNetworking and infrastructure: ${formatList(skills.infrastructure)}.\n\nScripting and technology exposure: ${formatList(skills.development)}.`, [
          action('View Skills', JARVIS_URLS.skills, 'fa-shield-halved')
        ]);
      }

      if (includesAny(q, ['experience', 'career', 'background', 'work history', 'professional history'])) {
        return response(`Muhammad has ${stats.experience.display} across cybersecurity, IT operations, infrastructure, development, and teaching. His experience includes ${formatList(this.knowledge.experience.map((item) => item.organization))}.`, [
          action('View Experience', JARVIS_URLS.experience, 'fa-briefcase'),
          action('Download Resume', JARVIS_URLS.resume, 'fa-file-arrow-down')
        ]);
      }

      if (includesAny(q, ['who is', 'about muhammad', 'about talha', 'tell me about him', 'profile', 'location', 'where is he from'])) {
        const profile = this.knowledge.profile;
        return response(`${profile.name} is a ${profile.professionalIdentity.toLowerCase()} based in ${profile.location}. He holds a ${profile.education.degree} with a ${profile.education.cgpa} CGPA and has ${profile.experience} experience across security training, hands-on projects, penetration testing, and enterprise IT operations.`, [
          action('About Muhammad', JARVIS_URLS.about, 'fa-user'),
          action('View Experience', JARVIS_URLS.experience, 'fa-briefcase')
        ]);
      }

      const educationDefinitions = [
        ['what is osint', 'OSINT, or open-source intelligence, is the collection and analysis of publicly available information for research, security assessment, investigations, and risk analysis. It should be conducted lawfully and ethically.'],
        ['what is vapt', 'VAPT combines vulnerability assessment—finding and prioritizing weaknesses—with penetration testing, which safely validates whether authorized weaknesses can be exploited.'],
        ['what is red team', 'A Red Team performs authorized, goal-driven simulations of real-world attacks to test an organization’s people, processes, and technology.'],
        ['what is nmap', 'Nmap is a network discovery and security-auditing tool used to identify hosts, services, ports, and selected network characteristics on authorized systems.'],
        ['what is penetration testing', 'Penetration testing is an authorized security assessment that safely attempts to validate exploitable weaknesses so they can be fixed.']
      ];
      const definition = educationDefinitions.find(([term]) => q.includes(term));
      if (definition) return response(definition[1], [action('View Skills', JARVIS_URLS.skills, 'fa-shield-halved')]);

      if (includesAny(q, ['hack', 'exploit', 'attack', 'bypass', 'steal password', 'ddos'])) {
        return response('I can help with high-level, defensive cybersecurity education and Muhammad’s public portfolio. I can’t guide attacks on real systems or provide instructions that could enable unauthorized access.');
      }

      return response('I don’t have that information in Muhammad Ahmed Talha’s portfolio. Try asking about his experience, skills, projects, certifications, education, speaking, resume, or contact details.', [
        action('View Portfolio', JARVIS_URLS.about, 'fa-compass'),
        action('Contact Muhammad', JARVIS_URLS.contact, 'fa-paper-plane')
      ]);
    }
  }

  // Optional provider for a secure backend/serverless proxy. Configure with:
  // window.JARVIS_CONFIG = { apiEndpoint: 'https://your-server.example/api/jarvis' }
  // The backend owns the AI key; no secret is ever placed in this frontend.
  class RemoteAIProvider {
    constructor(endpoint, fallback) {
      this.endpoint = endpoint;
      this.fallback = fallback;
    }

    async respond(question, history) {
      try {
        const result = await fetch(this.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: question, history: history.slice(-8), knowledgeVersion: PORTFOLIO_KNOWLEDGE.version })
        });
        if (!result.ok) throw new Error(`JARVIS endpoint returned ${result.status}`);
        const payload = await result.json();
        if (!payload || typeof payload.answer !== 'string') throw new Error('Invalid JARVIS response');
        const actions = Array.isArray(payload.actions) ? payload.actions.filter((item) =>
          item && typeof item.label === 'string' && typeof item.url === 'string') : [];
        return response(payload.answer, actions);
      } catch (error) {
        console.warn('JARVIS remote provider unavailable; using local portfolio knowledge.', error);
        return this.fallback.respond(question, history);
      }
    }
  }

  const safeUrl = (url) => {
    if (url.startsWith('#')) return url;
    try {
      const parsed = new URL(url, window.location.href);
      return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol) ? url : '#';
    } catch {
      return '#';
    }
  };

  class JarvisChatController {
    constructor(root, provider) {
      this.root = root;
      this.provider = provider;
      this.history = [];
      this.isProcessing = false;
      this.hasWelcomed = false;
      this.elements = {
        launcher: root.querySelector('#jarvis-launcher'),
        window: root.querySelector('#jarvis-chat-window'),
        minimize: root.querySelector('#jarvis-minimize-btn'),
        close: root.querySelector('#jarvis-close-btn'),
        messages: root.querySelector('#jarvis-messages'),
        form: root.querySelector('#jarvis-form'),
        input: root.querySelector('#jarvis-text-input'),
        send: root.querySelector('#jarvis-send-btn'),
        clear: root.querySelector('#jarvis-clear-btn')
      };
      this.bindEvents();
      this.setupViewportTracking();
    }

    bindEvents() {
      const el = this.elements;
      el.launcher.addEventListener('click', () => this.toggle());
      el.close.addEventListener('click', () => this.close());
      el.minimize.addEventListener('click', () => this.toggleMinimize());
      el.clear.addEventListener('click', () => this.clear());
      el.form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.ask(el.input.value);
      });
      el.input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          el.form.requestSubmit();
        }
      });
      el.input.addEventListener('input', () => this.resizeInput());
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.isOpen()) this.close();
      });
      document.addEventListener('click', (event) => {
        if (!this.isOpen() || el.window.classList.contains('jarvis-minimized')) return;
        if (!this.root.contains(event.target)) this.toggleMinimize(true);
      }, true);
    }

    isOpen() {
      return this.elements.window.classList.contains('jarvis-open');
    }

    toggle() {
      this.isOpen() ? this.close() : this.open();
    }

    open() {
      const el = this.elements;
      el.window.hidden = false;
      el.window.inert = false;
      requestAnimationFrame(() => el.window.classList.add('jarvis-open'));
      el.window.setAttribute('aria-hidden', 'false');
      document.body.classList.add('jarvis-chat-visible');
      el.launcher.setAttribute('aria-expanded', 'true');
      el.launcher.setAttribute('aria-label', 'Close JARVIS AI Assistant');
      if (el.window.classList.contains('jarvis-minimized')) this.toggleMinimize(false);
      if (!this.hasWelcomed) this.showWelcome();
      this.resizeInput();
    }

    close() {
      const el = this.elements;
      el.window.classList.remove('jarvis-open');
      el.window.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('jarvis-chat-visible');
      el.window.inert = true;
      el.launcher.setAttribute('aria-expanded', 'false');
      el.launcher.setAttribute('aria-label', 'Open JARVIS AI Assistant');
      window.setTimeout(() => {
        if (!this.isOpen()) el.window.hidden = true;
      }, 260);
      el.launcher.focus();
    }

    toggleMinimize(force) {
      const el = this.elements;
      const minimize = typeof force === 'boolean' ? force : !el.window.classList.contains('jarvis-minimized');
      el.window.classList.toggle('jarvis-minimized', minimize);
      el.minimize.setAttribute('aria-label', minimize ? 'Restore JARVIS' : 'Minimize JARVIS');
      el.minimize.title = minimize ? 'Restore' : 'Minimize';
      el.minimize.querySelector('i').className = minimize ? 'fas fa-window-restore' : 'fas fa-minus';
    }

    showWelcome() {
      this.hasWelcomed = true;
      this.addMessage('bot', response(
        "Hello! I’m JARVIS, Muhammad Ahmed Talha’s AI portfolio assistant. I can help you explore his cybersecurity expertise, IT infrastructure experience, projects, certifications, career background, and contact information."
      ), [
        ['About Muhammad', 'Who is Muhammad Ahmed Talha?'],
        ['Skills & Tools', 'What are his skills and tools?'],
        ['Projects', 'What projects has he built?'],
        ['Experience', 'Tell me about his experience'],
        ['Certifications', 'What certifications does he have?'],
        ['Resume', 'Show me his resume'],
        ['Contact', 'How can I contact him?']
      ]);
    }

    clear() {
      this.history = [];
      this.hasWelcomed = false;
      this.elements.messages.replaceChildren();
      this.showWelcome();
    }

    async ask(rawQuestion) {
      const question = rawQuestion.trim();
      if (!question || this.isProcessing) return;
      this.isProcessing = true;
      this.setProcessing(true);
      this.elements.input.value = '';
      this.resizeInput();
      this.addMessage('user', response(question));
      this.history.push({ role: 'user', content: question });
      const typing = this.showTyping();
      const started = performance.now();

      try {
        const answer = await this.provider.respond(question, this.history);
        const remainingDelay = Math.max(0, 360 - (performance.now() - started));
        if (remainingDelay) await new Promise((resolveDelay) => window.setTimeout(resolveDelay, remainingDelay));
        typing.remove();
        this.addMessage('bot', answer);
        this.history.push({ role: 'assistant', content: answer.answer });
      } catch (error) {
        typing.remove();
        console.error('JARVIS could not process the message.', error);
        this.addMessage('bot', response('I’m having trouble processing that request. Please try again, or use the portfolio navigation below.', [
          action('View Portfolio', JARVIS_URLS.about, 'fa-compass')
        ]));
      } finally {
        this.isProcessing = false;
        this.setProcessing(false);
      }
    }

    setProcessing(processing) {
      this.elements.send.disabled = processing;
      this.elements.input.disabled = processing;
      this.elements.send.setAttribute('aria-busy', String(processing));
    }

    addMessage(role, payload, quickActions = []) {
      const wrapper = document.createElement('article');
      wrapper.className = `jarvis-msg jarvis-msg-${role}`;

      if (role === 'bot') {
        const avatar = document.createElement('span');
        avatar.className = 'jarvis-msg-avatar';
        avatar.setAttribute('aria-hidden', 'true');
        avatar.innerHTML = '<svg viewBox="0 0 24 24"><path d="M7 7h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3Z"/><path d="M8 12h.01M16 12h.01M8.5 16h7"/></svg>';
        wrapper.append(avatar);
      }

      const bubble = document.createElement('div');
      bubble.className = 'jarvis-msg-bubble';
      const meta = document.createElement('div');
      meta.className = 'jarvis-msg-meta';
      meta.textContent = `${role === 'bot' ? 'JARVIS' : 'YOU'} • ${new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit' }).format(new Date())}`;
      bubble.append(meta, this.renderText(payload.answer));

      if (payload.actions?.length) bubble.append(this.renderActions(payload.actions));
      if (quickActions.length) bubble.append(this.renderQuickActions(quickActions));
      wrapper.append(bubble);
      this.elements.messages.append(wrapper);
      this.scrollToLatest();
      return wrapper;
    }

    renderText(text) {
      const box = document.createElement('div');
      box.className = 'jarvis-msg-text';
      const lines = text.split('\n');
      const listItems = [];
      lines.forEach((line) => {
        if (line.startsWith('• ')) {
          listItems.push(line.slice(2));
        } else if (line.trim()) {
          const paragraph = document.createElement('p');
          paragraph.textContent = line;
          box.append(paragraph);
        }
      });
      if (listItems.length) {
        const list = document.createElement('ul');
        listItems.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          list.append(li);
        });
        box.append(list);
      }
      return box;
    }

    renderActions(actions) {
      const container = document.createElement('div');
      container.className = 'jarvis-actions';
      actions.forEach((item) => {
        const link = document.createElement('a');
        link.className = 'jarvis-action-btn';
        link.href = safeUrl(item.url);
        const icon = document.createElement('i');
        const requestedIcon = /^[a-z0-9 -]+$/i.test(item.icon || '') ? item.icon : 'fa-arrow-right';
        icon.className = requestedIcon.includes('fa-brands') ? requestedIcon : `fas ${requestedIcon}`;
        icon.setAttribute('aria-hidden', 'true');
        link.append(icon, document.createTextNode(item.label));
        if (!item.url.startsWith('#') && !item.url.startsWith('mailto:') && !item.url.startsWith('tel:')) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        if (item.url.startsWith('#')) link.addEventListener('click', () => this.close());
        container.append(link);
      });
      return container;
    }

    renderQuickActions(actions) {
      const container = document.createElement('div');
      container.className = 'jarvis-quick-actions';
      actions.forEach(([label, question]) => {
        const button = document.createElement('button');
        button.className = 'jarvis-chip';
        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', () => this.ask(question));
        container.append(button);
      });
      return container;
    }

    showTyping() {
      const row = document.createElement('div');
      row.className = 'jarvis-typing-row';
      row.setAttribute('role', 'status');
      row.innerHTML = '<div class="jarvis-typing"><span>JARVIS is thinking...</span><span class="jarvis-dots" aria-hidden="true"><i></i><i></i><i></i></span></div>';
      this.elements.messages.append(row);
      this.scrollToLatest();
      return row;
    }

    scrollToLatest() {
      requestAnimationFrame(() => {
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
      });
    }

    resizeInput() {
      const input = this.elements.input;
      input.style.overflowY = 'hidden';
      input.style.height = 'auto';
      input.style.height = `${Math.min(input.scrollHeight, 96)}px`;
      if (input.scrollHeight > 96) input.style.overflowY = 'auto';
    }

    setupViewportTracking() {
      let frameRequested = false;
      const update = () => {
        frameRequested = false;
        const viewport = window.visualViewport;
        const width = viewport?.width || window.innerWidth;
        const height = viewport?.height || window.innerHeight;
        const offsetLeft = viewport?.offsetLeft || 0;
        const offsetTop = viewport?.offsetTop || 0;
        const layoutWidth = document.documentElement.clientWidth || window.innerWidth;
        const layoutHeight = document.documentElement.clientHeight || window.innerHeight;
        const rightOffset = Math.max(0, layoutWidth - offsetLeft - width);
        const bottomOffset = Math.max(0, layoutHeight - offsetTop - height);

        document.documentElement.style.setProperty('--jarvis-viewport-width', `${width}px`);
        document.documentElement.style.setProperty('--jarvis-viewport-height', `${height}px`);
        document.documentElement.style.setProperty('--jarvis-viewport-right', `${rightOffset}px`);
        document.documentElement.style.setProperty('--jarvis-viewport-bottom', `${bottomOffset}px`);
      };
      const scheduleUpdate = () => {
        if (frameRequested) return;
        frameRequested = true;
        requestAnimationFrame(update);
      };

      update();
      window.addEventListener('resize', scheduleUpdate, { passive: true });
      window.addEventListener('orientationchange', scheduleUpdate, { passive: true });
      window.visualViewport?.addEventListener('resize', scheduleUpdate, { passive: true });
      window.visualViewport?.addEventListener('scroll', scheduleUpdate, { passive: true });
    }
  }

  async function initializeJarvis() {
    try {
      const fragmentUrl = new URL('jarvis-aichatbot.html', document.baseURI);
      const fragmentResponse = await fetch(fragmentUrl, { cache: 'no-store' });
      if (!fragmentResponse.ok) throw new Error(`Could not load JARVIS UI (${fragmentResponse.status})`);
      const host = document.createElement('div');
      host.innerHTML = await fragmentResponse.text();
      const root = host.firstElementChild;
      if (!root) throw new Error('JARVIS UI fragment is empty');
      document.body.append(root);

      const localProvider = new LocalPortfolioProvider(PORTFOLIO_KNOWLEDGE);
      const endpoint = window.JARVIS_CONFIG?.apiEndpoint;
      const provider = endpoint ? new RemoteAIProvider(endpoint, localProvider) : localProvider;
      const controller = new JarvisChatController(root, provider);

      // Public extension point for replacing the provider without changing the UI.
      window.JarvisPortfolioAssistant = Object.freeze({
        open: () => controller.open(),
        close: () => controller.close(),
        ask: (question) => controller.ask(question),
        knowledgeVersion: PORTFOLIO_KNOWLEDGE.version
      });
    } catch (error) {
      console.error('JARVIS failed to initialize.', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeJarvis, { once: true });
  } else {
    initializeJarvis();
  }
})();
