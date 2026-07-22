(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.site-nav');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const welcomeIntro = document.querySelector('[data-welcome-intro]');
  if (welcomeIntro) {
    const introDelay = prefersReducedMotion ? 350 : 3400;
    const removeDelay = prefersReducedMotion ? 50 : 650;

    window.setTimeout(() => {
      welcomeIntro.classList.add('is-leaving');
      document.documentElement.classList.remove('intro-running');
      window.setTimeout(() => welcomeIntro.remove(), removeDelay);
    }, introDelay);
  } else {
    document.documentElement.classList.remove('intro-running');
  }

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  const closeNavigation = () => {
    if (!navToggle || !navigation) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menü öffnen');
    navigation.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  };

  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Menü öffnen' : 'Menü schließen');
    navigation?.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });

  navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavigation();
  });

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const revealItems = document.querySelectorAll('.reveal:not(.is-visible)');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px' });
    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const builder = document.querySelector('[data-contact-builder]');
  if (builder) {
    const state = { customer: 'Privathaushalt', energy: 'Strom' };
    const preview = builder.querySelector('[data-message-preview]');
    const whatsAppLink = builder.querySelector('[data-whatsapp-link]');
    const emailLink = builder.querySelector('[data-email-link]');

    const buildMessage = () => {
      const customerPhrase = state.customer === 'Gewerbe' ? 'für mein Unternehmen' : 'für meinen Privathaushalt';
      const contractPhrase = state.energy === 'Strom und Gas' ? 'meine Strom- und Gasverträge' : `meinen ${state.energy}vertrag`;
      return `Hallo Kevin und Björn, ich möchte ${contractPhrase} ${customerPhrase} prüfen lassen.`;
    };

    const updateContactLinks = () => {
      const message = buildMessage();
      const encodedMessage = encodeURIComponent(message);
      if (preview) preview.textContent = message;
      if (whatsAppLink) whatsAppLink.href = `https://wa.me/4915144245033?text=${encodedMessage}`;
      if (emailLink) emailLink.href = `mailto:vossdickegbr@gmail.com?subject=${encodeURIComponent('Anfrage zur Energieberatung')}&body=${encodedMessage}`;
    };

    builder.querySelectorAll('.choice').forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.dataset.group;
        const value = button.dataset.value;
        if (!group || !value || !(group in state)) return;
        state[group] = value;
        builder.querySelectorAll(`.choice[data-group="${group}"]`).forEach((choice) => {
          choice.classList.toggle('is-active', choice === button);
        });
        updateContactLinks();
      });
    });

    updateContactLinks();
  }


  const siteChat = document.querySelector('[data-site-chat]');
  if (siteChat) {
    const openButtons = document.querySelectorAll('[data-chat-open]');
    const closeButtons = siteChat.querySelectorAll('[data-chat-close]');
    const chatWindow = siteChat.querySelector('.chat-window');
    const chatBody = siteChat.querySelector('[data-chat-body]');
    const welcomeMessage = siteChat.querySelector('[data-chat-message="welcome"]');
    const infoMessage = siteChat.querySelector('[data-chat-message="info"]');
    const typing = siteChat.querySelector('[data-chat-typing]');
    const actions = siteChat.querySelector('[data-chat-actions]');
    let activeTimers = [];
    let lastFocusedElement = null;

    const clearChatTimers = () => {
      activeTimers.forEach((timer) => window.clearTimeout(timer));
      activeTimers = [];
    };

    const setChatTime = () => {
      const time = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' }).format(new Date());
      siteChat.querySelectorAll('[data-chat-time]').forEach((element) => {
        element.textContent = time;
      });
    };

    const scrollChatToBottom = () => {
      if (!chatBody) return;
      window.requestAnimationFrame(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
      });
    };

    const resetChat = () => {
      clearChatTimers();
      [welcomeMessage, infoMessage, typing, actions].forEach((element) => {
        if (element) element.hidden = true;
      });
    };

    const runChatSequence = () => {
      resetChat();
      setChatTime();
      const firstDelay = prefersReducedMotion ? 80 : 450;
      const typingDelay = prefersReducedMotion ? 250 : 1700;
      const secondDelay = prefersReducedMotion ? 500 : 4000;
      const actionDelay = prefersReducedMotion ? 650 : 4350;

      activeTimers.push(window.setTimeout(() => {
        if (welcomeMessage) welcomeMessage.hidden = false;
        scrollChatToBottom();
      }, firstDelay));
      activeTimers.push(window.setTimeout(() => {
        if (typing) typing.hidden = false;
        scrollChatToBottom();
      }, typingDelay));
      activeTimers.push(window.setTimeout(() => {
        if (typing) typing.hidden = true;
        if (infoMessage) infoMessage.hidden = false;
        scrollChatToBottom();
      }, secondDelay));
      activeTimers.push(window.setTimeout(() => {
        if (actions) actions.hidden = false;
        scrollChatToBottom();
      }, actionDelay));
    };

    const openChat = () => {
      lastFocusedElement = document.activeElement;
      closeNavigation();
      siteChat.hidden = false;
      siteChat.setAttribute('aria-hidden', 'false');
      document.body.classList.add('chat-open');
      runChatSequence();
      window.requestAnimationFrame(() => siteChat.querySelector('.chat-close')?.focus());
    };

    const closeChat = () => {
      clearChatTimers();
      siteChat.hidden = true;
      siteChat.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('chat-open');
      if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
    };

    openButtons.forEach((button) => button.addEventListener('click', openChat));
    closeButtons.forEach((button) => button.addEventListener('click', closeChat));

    document.addEventListener('keydown', (event) => {
      if (siteChat.hidden) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeChat();
        return;
      }
      if (event.key !== 'Tab' || !chatWindow) return;
      const focusable = [...chatWindow.querySelectorAll('a[href], button:not([disabled])')].filter((element) => !element.hasAttribute('hidden'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

})();
