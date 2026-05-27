'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Globe, 
  TrendingUp, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  Star,
  Quote,
  CheckCircle2, 
  Bot, 
  ArrowRight, 
  Zap, 
  DollarSign, 
  Sparkles, 
  ArrowUpRight, 
  Check, 
  Menu, 
  X,
  Play,
  RotateCcw,
  Clock,
  Briefcase,
  Layers,
  ChevronDown,
  Building
} from 'lucide-react';

// Industry options for simulator
const segments = [
  { id: 'imobiliaria', name: 'Imobiliárias & Corretores', icon: '🏢' },
  { id: 'estetica', name: 'Clínica de Estética & Saúde', icon: '💖' },
  { id: 'saas', name: 'Tecnologia & SaaS', icon: '💻' },
  { id: 'advocacia', name: 'Escritórios de Advocacia / Consultorias', icon: '⚖️' },
  { id: 'ecommerce', name: 'E-commerce & Varejo', icon: '🛒' },
  { id: 'default', name: 'Outros Prestadores de Serviços B2B', icon: '💼' }
];

// Contextual realistic client testimonials for LF7
const testimonials = [
  {
    id: 1,
    name: "Marcos Valadares",
    role: "Sócio-Diretor da Valadares Advogados",
    segment: "Advocacia & Advocacia Corporativa",
    result: "+180% em Agendamentos Qualificados",
    highlight: "Redução do tempo de resposta de 2 horas para 30 segundos",
    rating: 5,
    quote: "Antes da LF7, nossa equipe jurídica perdia metade do dia triando contatos desqualificados no WhatsApp. Com a automação inteligente da LF7, os clientes chegam com toda a documentação prévia entregue, prontos para a consulta. Reduzimos o tempo de resposta de forma drástica.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    name: "Camila Schmidt",
    role: "Proprietária da Schmidt Estética Avançada",
    segment: "Clínica de Estética & Saúde",
    result: "72% de Redução na Ociosidade de Agenda",
    highlight: "Crescimento de 40% no faturamento em apenas 3 meses",
    rating: 5,
    quote: "O simulador conversacional e a IA estruturada mudaram o jogo na nossa clínica. A assistente virtual agenda as sessões, oferece retornos automáticos pós-procedimento e reativa clientes antigos de forma extremamente natural.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    name: "Gustavo Rocha",
    role: "Diretor Comercial do Grupo Rocha Imóveis",
    segment: "Imobiliária & Construtora",
    result: "-45% no Custo por Lead Qualificado",
    highlight: "Integração nativa de IA com funil do RD Station",
    rating: 5,
    quote: "Integrar a LF7 com nosso CRM (RD Station) foi o melhor investimento que fizemos este ano. A IA faz a captação, qualifica o interesse e só passa para os nossos corretores os leads com real potencial de compra de imóveis de médio e alto padrão.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 4,
    name: "Renata Lins",
    role: "Co-fundadora da CloudMetrics",
    segment: "SaaS & Produto Digital",
    result: "91% dos Contatos Iniciais Automatizados",
    highlight: "Conversão final do funil de vendas saltou de 3% para 9.5%",
    rating: 5,
    quote: "A velocidade crítica de resposta é um diferencial no B2B. Com a LF7, o lead de tráfego pago recebe o primeiro diagnóstico em segundos e já direciona para o agendamento de chamadas comerciais. Aumento absurdo de produtividade.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

// Conversational interface simulator
interface Message {
  sender: 'client' | 'ai';
  text: string;
}

export default function Home() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // ROI Calculator states
  const [leadsCount, setLeadsCount] = useState(150);
  const [averageTicket, setAverageTicket] = useState(2500);
  const [currentConversion, setCurrentConversion] = useState(4); // in %
  const [averageDelay, setAverageDelay] = useState(90); // in minutes

  // Calculated ROI values (Derived on-the-fly to respect react-hooks/set-state-in-effect and improve performance)
  let lossRate = 0;
  if (averageDelay <= 5) lossRate = 10;
  else if (averageDelay <= 15) lossRate = 25;
  else if (averageDelay <= 60) lossRate = 50;
  else if (averageDelay <= 180) lossRate = 70;
  else lossRate = 85;

  const actualSales = (leadsCount * (currentConversion / 100));
  const potentialSalesWithoutDelay = actualSales / (1 - (lossRate / 100));
  const financialLoss = Math.round((potentialSalesWithoutDelay - actualSales) * averageTicket);
  
  const lf7RecoverPercent = 0.45;
  const recoveredLeads = Math.round((potentialSalesWithoutDelay - actualSales) * lf7RecoverPercent);
  const recoveredRevenue = Math.round(recoveredLeads * averageTicket);

  // CRM & WhatsApp Simulator State
  const [simulatorCompany, setSimulatorCompany] = useState('');
  const [simulatorSegment, setSimulatorSegment] = useState('imobiliaria');
  const [simulatorChallenges, setSimulatorChallenges] = useState('Demora na resposta e acompanhamento de contatos');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0); // 0: Form, 1: Running, 2: Done
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  // Generated strategies
  const [customAutomationScript, setCustomAutomationScript] = useState('');
  const [painAnalysis, setPainAnalysis] = useState('');
  const [suggestedCampaigns, setSuggestedCampaigns] = useState('');
  const [chatDialogue, setChatDialogue] = useState<Message[]>([]);
  const [activeChatMessages, setActiveChatMessages] = useState<Message[]>([]);
  const [typingIndex, setTypingIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [crmColumn, setCrmColumn] = useState<'captured' | 'qualifying' | 'hot' | 'scheduled'>('captured');

  // FAQ Accordion states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Policy & Terms states
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Testimonials state and auto-play
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoplayTestimonials, setAutoplayTestimonials] = useState(true);

  useEffect(() => {
    if (!autoplayTestimonials) return;
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [autoplayTestimonials]);

  // Refs for auto scroll and scrolling to sections
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to section helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Run lead simulation
  const handleStartSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatorCompany.trim()) return;

    setIsLoadingAPI(true);
    setIsSimulating(true);
    setSimulationStep(1);
    setCrmColumn('captured');
    setActiveChatMessages([]);
    setTypingIndex(-1);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: simulatorCompany,
          segment: simulatorSegment,
          currentChallenges: simulatorChallenges
        })
      });

      const data = await response.json();
      if (data.success) {
        setCustomAutomationScript(data.customAutomationScript);
        setPainAnalysis(data.painAnalysis);
        setSuggestedCampaigns(data.suggestedCampaigns);
        setChatDialogue(data.whatsappSimulatorDialogue);
        setTypingIndex(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAPI(false);
    }
  };

  // WhatsApp typing simulator effect
  useEffect(() => {
    if (typingIndex < 0 || typingIndex >= chatDialogue.length) {
      return;
    }

    const currentMsg = chatDialogue[typingIndex];
    Promise.resolve().then(() => {
      setIsTyping(true);
    });

    // Dynamic typing delay based on message length
    const typingDelay = Math.min(2000, 800 + currentMsg.text.length * 20);

    const timer = setTimeout(() => {
      setIsTyping(false);
      setActiveChatMessages(prev => [...prev, currentMsg]);

      const nextIndex = typingIndex + 1;

      // If we finished the last message, transition to success screen
      if (nextIndex >= chatDialogue.length) {
        setCrmColumn('scheduled');
        setSimulationStep(2);
      } else {
        // Move CRM stages based on dialogue progress
        const progress = nextIndex / chatDialogue.length;
        if (progress < 0.25) {
          setCrmColumn('captured');
        } else if (progress < 0.6) {
          setCrmColumn('qualifying');
        } else {
          setCrmColumn('hot');
        }
      }

      setTypingIndex(nextIndex);
    }, typingDelay);

    return () => clearTimeout(timer);
  }, [typingIndex, chatDialogue]);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChatMessages, isTyping]);

  const resetSimulator = () => {
    setSimulatorCompany('');
    setSimulationStep(0);
    setIsSimulating(false);
    setActiveChatMessages([]);
    setTypingIndex(-1);
    setCrmColumn('captured');
  };

  const faqItems = [
    {
      q: "Eu já tenho um site e uma conta no WhatsApp. Preciso trocar de número?",
      a: "Não! Seus número e sites atuais podem ser mantidos. No caso do WhatsApp, integramos a inteligência artificial diretamente ao seu número comercial atual utilizando a API oficial (Cloud API do WhatsApp), garantindo máxima segurança contra banimentos e zero atrito operacional para sua equipe."
    },
    {
      q: "Como a Inteligência Artificial sabe o que responder para o meu cliente?",
      a: "Desenvolvemos uma base de conhecimentos de Engenharia de Prompt e dados personalizada para o seu negócio. Mapeamos seus produtos, preços, formas de pagamento, objeções frequentes e políticas. A IA é estritamente programada para não inventar informações e, caso surja uma pergunta altamente incomum, passa o atendimento na hora para um agente humano da sua equipe."
    },
    {
      q: "Em quanto tempo os resultados começam a aparecer?",
      a: "No pilar de Automação de WhatsApp e Criação de Sites de Alta Conversão, o impacto é imediato. No primeiro dia de funcionamento da IA, nenhum lead mais esfria e todas as abordagens do tráfego acontecem em segundos. Para a Gestão de Tráfego, iniciamos com fases de teste aceleradas de 7 a 15 dias para otimizar os criativos e começar a trazer leads qualificados diariamente."
    },
    {
      q: "Preciso de um computador ligado para as automações funcionarem?",
      a: "De forma alguma! Nossa infraestrutura funciona inteiramente na nuvem (Cloud Computing). Seus 'Funcionários IA' e sistemas de automação de vendas estarão ativos 24 horas por dia, 7 dias por semana, mesmo que seu celular esteja desligado, que a empresa esteja fechada ou que seja feriado nacional."
    }
  ];

  return (
    <div className="overflow-x-hidden min-h-screen bg-[#0A0A0B] text-[#E5E5E5] font-sans">
      {/* Dynamic Top Bar Accent - Elegant Gold Gradient */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#886221] via-[#C5A059] to-[#E5C384]"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F0F12]/90 backdrop-blur-md border-b border-[#1A1A1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="h-9 w-9 bg-[#C5A059] flex items-center justify-center font-bold text-black text-xs tracking-wider transition-all duration-300 hover:bg-[#D4AF37]" id="hdr-logo">
              LF7
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-base leading-none tracking-tight">LF7</span>
              <span className="text-[#C5A059] font-medium text-[9px] tracking-[0.18em] uppercase mt-0.5">Marketing & IA</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 uppercase text-[11px] tracking-widest text-[#A1A1AA]">
            <button onClick={() => scrollTo('pas-section')} className="hover:text-[#C5A059] transition-colors" id="nav-btn-dores">Dores do Mercado</button>
            <button onClick={() => scrollTo('servicos')} className="hover:text-[#C5A059] transition-colors" id="nav-btn-servicos">Serviços</button>
            <button onClick={() => scrollTo('simulator')} className="hover:text-[#C5A059] transition-colors" id="nav-btn-crm">Testar CRM IA</button>
            <button onClick={() => scrollTo('roi-calculator')} className="hover:text-[#C5A059] transition-colors" id="nav-btn-roi">Calcular ROI</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-[#C5A059] transition-colors" id="nav-btn-faq">Dúvidas</button>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consultoria%20com%20a%20LF7!"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#1A1A1C] bg-[#0A0A0B] hover:border-[#C5A059]/40 text-[#E5E5E5] hover:text-white rounded-none px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all"
              id="header-cta-secondary"
            >
              Falar com Especialista
            </a>
            <button 
              onClick={() => scrollTo('simulator')}
              className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-[11px] rounded-none px-5 py-3 transition-all hover:scale-[1.02]"
              id="header-cta"
            >
              Simular Negócio
            </button>
          </div>

          {/* Mobile hamburger icon */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-[#A1A1AA] hover:text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0F0F12] border-b border-[#1A1A1C] overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3 flex flex-col uppercase text-[10px] tracking-widest text-[#A1A1AA]">
                <button 
                  onClick={() => { setMobileMenuOpen(false); scrollTo('pas-section'); }}
                  className="text-left hover:text-[#C5A059] py-2.5 border-b border-[#1A1A1C]"
                >
                  Dores do Mercado
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); scrollTo('servicos'); }}
                  className="text-left hover:text-[#C5A059] py-2.5 border-b border-[#1A1A1C]"
                >
                  Serviços
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); scrollTo('simulator'); }}
                  className="text-left hover:text-[#C5A059] py-2.5 border-b border-[#1A1A1C]"
                >
                  Testar CRM IA
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); scrollTo('roi-calculator'); }}
                  className="text-left hover:text-[#C5A059] py-2.5 border-b border-[#1A1A1C]"
                >
                  Calcular ROI
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); scrollTo('faq'); }}
                  className="text-left hover:text-[#C5A059] py-2.5 border-b border-[#1A1A1C]"
                >
                  Dúvidas
                </button>
                <div className="pt-4 flex flex-col gap-3">
                  <a 
                    href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consultoria%20com%20a%20LF7!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#1A1A1C] bg-[#0A0A0B] text-[#E5E5E5] hover:text-white rounded-none py-3.5 text-center text-[10px] font-bold uppercase tracking-widest inline-block"
                  >
                    Atendimento WhatsApp
                  </a>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); scrollTo('simulator'); }}
                    className="bg-[#C5A059] text-black rounded-none py-3.5 text-center text-[10px] font-bold uppercase tracking-widest"
                  >
                    Iniciar Teste CRM IA
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 1. Hero Section */}
      <section id="hero" className="relative pt-12 pb-24 md:pt-24 md:pb-32 overflow-hidden border-b border-[#1A1A1C]">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="https://res.cloudinary.com/dq3cmyhmo/video/upload/v1779901029/Desloque_imagem_para_direita_202605271230_njlazn.mp4" type="video/mp4" />
        </video>

        {/* Subtle semi-transparent overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#0A0A0B]/60 z-0 pointer-events-none"></div>

        {/* Subtle Luxury Ambient Background lines or glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-left max-w-4xl mr-auto">
            
            {/* Elegant luxury floating badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 rounded-full px-4 py-1.5 mb-8 shadow-inner"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em]">
                ARQUITETURA DE ALTA CONVERSÃO B2B
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight leading-[1.12] mb-6"
            >
              <span className="text-[#C5A059]">Escale</span> sua conversão e recupere leads no{' '}
              <span className="text-[#C5A059] italic font-normal">
                Piloto Automático.
              </span>
            </motion.h1>

            {/* Sub-headline focused on pain */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A1A1AA] text-base sm:text-lg md:text-xl font-light mb-12 max-w-3xl leading-relaxed"
            >
              Diga adeus ao vazamento de recursos. Construímos <strong className="text-white font-semibold">Funcionários IA 24/7</strong> que qualificam e agendam reuniões comerciais em 3 segundos, integrando sites de elite e campanhas corporativas focadas em ROI.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 max-w-md sm:max-w-none"
            >
              <a 
                href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20diagn%C3%B3stico%20de%20automa%C3%A7%C3%A3o%20gratuito!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#D4AF37] text-black rounded-none px-8 py-4.5 font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2"
                id="hero-primary-cta"
              >
                <span>Falar com especialista</span>
                <ArrowRight className="h-4 w-4 text-black" />
              </a>

              <button 
                onClick={() => scrollTo('simulator')}
                className="w-full sm:w-auto bg-[#0F0F12] hover:bg-[#121215] text-[#E5E5E5] border border-[#1A1A1C] hover:border-[#C5A059]/40 rounded-none px-8 py-4.5 font-bold uppercase tracking-widest text-xs transition-all duration-300"
                id="hero-secondary-cta"
              >
                <span>Testar Simulador de CRM</span>
              </button>
            </motion.div>

            {/* Trust Banner */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20 pt-12 border-t border-[#1A1A1C] flex flex-wrap justify-start items-center gap-x-12 gap-y-6 text-[#71717A] font-mono text-[10px] tracking-[0.25em]"
            >
              <span>✨ CONVERSÃO DE ELITE</span>
              <span>⚡ ATENDIMENTO EM 3 SEGUNDOS</span>
              <span>🛠️ ARQUITETURA PERSUASIVA</span>
              <span>🔒 FLUXOS OFICIAIS WHATSAPP</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Seção de Conscientização - Framework PAS */}
      <section id="pas-section" className="py-24 bg-[#0F0F12] border-b border-[#1A1A1C] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#C5A059] font-mono text-xs uppercase tracking-[0.25em] mb-3">Dores de Mercado (PAS)</h2>
            <p className="text-3xl sm:text-4xl font-serif font-light text-white tracking-tight leading-snug">
              Sua equipe perde vendas por gargalos invisíveis?
            </p>
          </div>

          {/* PAS - Dores Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Problema 1: Contatos Esfriando */}
            <div className="bg-[#121215] border border-[#1A1A1C] p-8 hover:border-[#C5A059]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-[#C5A059] font-serif italic text-2xl mb-4">01</h3>
                <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-3">Leads Esfriando no WhatsApp</h4>
                <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed mb-6">
                  Se um investidor ou cliente em potencial entra em contato e você demora mais de 5 minutos para responder, a chance de qualificação cai em <strong className="text-[#C5A059] font-semibold">391%</strong>. No mercado atual, a concorrência engole quem responde devagar.
                </p>
              </div>
              <div className="border-t border-[#1A1A1C] pt-4 text-[10px] font-mono text-[#71717A] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#C5A059]" /> AGITAÇÃO: Investimento em tráfego desperdiçado
              </div>
            </div>

            {/* Problema 2: Site sem Credibilidade */}
            <div className="bg-[#121215] border border-[#1A1A1C] p-8 hover:border-[#C5A059]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-[#C5A059] font-serif italic text-2xl mb-4">02</h3>
                <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-3">Sites Lentos e Obsoletos</h4>
                <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed mb-6">
                  Sua empresa possui apenas um site institucional ultrapassado ou uma página lenta que não passa profissionalismo? Clientes exigentes procuram segurança corporativa. Site lento é sinônimo de prejuízo imediato.
                </p>
              </div>
              <div className="border-t border-[#1A1A1C] pt-4 text-[10px] font-mono text-[#71717A] uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-[#C5A059]" /> AGITAÇÃO: Perda de autoridade e credibilidade digital
              </div>
            </div>

            {/* Problema 3: Orçamento de Tráfego Queimado */}
            <div className="bg-[#121215] border border-[#1A1A1C] p-8 hover:border-[#C5A059]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-[#C5A059] font-serif italic text-2xl mb-4">03</h3>
                <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-3">Verba Queimada em Anúncios</h4>
                <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed mb-6">
                  Fazer anúncios simples direcionados ao WhatsApp sem ter uma estratégia sólida de conversão e qualificação prévia é queimar dinheiro. Você recebe dezenas de curiosos querendo apenas o preço e sobrecarrega seu time.
                </p>
              </div>
              <div className="border-t border-[#1A1A1C] pt-4 text-[10px] font-mono text-[#71717A] uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-[#C5A059]" /> AGITAÇÃO: Equipe comercial sobrecarregada com curiosos
              </div>
            </div>

          </div>

          {/* LF7 Solution Banner */}
          <div className="mt-16 bg-[#121215] border border-[#1A1A1C] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <span className="text-[#C5A059] font-bold font-mono text-[9px] uppercase tracking-widest bg-[#C5A059]/10 border border-[#C5A059]/30 px-3 py-1 rounded-full inline-block mb-4">
                  A Solução Definitiva
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-white mb-4 leading-tight">
                  Como a LF7 resolve de ponta a ponta
                </h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  Não criamos apenas sites ou anúncios soltos. Implementamos um <strong className="text-white font-semibold">Ecossistema Completo de Vendas Automatizadas</strong>. Construímos campanhas de anúncios persuasivas que atraem clientes com alta intenção de compra, encaminhamos para sites de elite ultrarrápidos e qualificamos cada contato instantaneamente com Inteligência Artificial, agendando reuniões diretamente na sua agenda comercial.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-end">
                <button 
                  onClick={() => scrollTo('simulator')}
                  className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs py-4 px-8 w-full lg:w-fit transition-all hover:scale-[1.02]"
                >
                  Ver LF7 na Prática &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Nossos Serviços */}
      <section id="servicos" className="py-24 bg-gradient-to-b from-[#0A0A0B] via-[#121215] to-[#0A0A0B] border-b border-[#1A1A1C] relative overflow-hidden">
        {/* Dynamic & Highly Visible Laser Network Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Laser Glow Effect Filter */}
              <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur1" />
                <feGaussianBlur stdDeviation="8" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="laserGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C5A059" stopOpacity="0" />
                <stop offset="40%" stopColor="#D4AF37" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#E5C384" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="laserGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#886221" stopOpacity="0" />
                <stop offset="30%" stopColor="#C5A059" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="radialLaser" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                <stop offset="50%" stopColor="#E5C384" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#886221" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Custom Embedded Scoped Keyframe Animations */}
            <style>{`
              @keyframes laserFrequencyPulse {
                0%, 100% { opacity: 0.5; stroke-width: 1.5px; }
                50% { opacity: 1; stroke-width: 3.5px; }
              }
              @keyframes laserBeamSweep1 {
                0% { transform: translateY(-20%) rotate(0deg); }
                50% { transform: translateY(20%) rotate(3deg); }
                100% { transform: translateY(-20%) rotate(0deg); }
              }
              @keyframes laserBeamSweep2 {
                0% { transform: translateX(-10%) rotate(0deg); }
                50% { transform: translateX(10%) rotate(-3deg); }
                100% { transform: translateX(-10%) rotate(0deg); }
              }
              @keyframes coordinateFlow {
                0% { stroke-dashoffset: 80; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes scannerPulse {
                0%, 100% { r: 160px; stroke-opacity: 0.15; }
                50% { r: 180px; stroke-opacity: 0.4; }
              }
              .laser-anim-sweep1 {
                animation: laserFrequencyPulse 3.5s ease-in-out infinite, laserBeamSweep1 10s ease-in-out infinite;
                transform-origin: center;
              }
              .laser-anim-sweep2 {
                animation: laserFrequencyPulse 4.5s ease-in-out infinite, laserBeamSweep2 12s ease-in-out infinite;
                transform-origin: center;
              }
              .laser-coordinate-grid {
                stroke-dasharray: 8 16;
                animation: coordinateFlow 6s linear infinite;
              }
              .laser-main-axis {
                stroke-dasharray: 100 200;
                animation: coordinateFlow 12s linear infinite;
              }
              .laser-scanner-reticle {
                animation: scannerPulse 4s ease-in-out infinite;
              }
            `}</style>
            
            {/* Highly visible laser coordinate lines with dynamic flow */}
            <g stroke="#C5A059" strokeWidth="0.75" strokeOpacity="0.25">
              <line x1="0" y1="10%" x2="100%" y2="10%" className="laser-coordinate-grid" />
              <line x1="0" y1="30%" x2="100%" y2="30%" className="laser-coordinate-grid" style={{ animationDirection: 'reverse', animationDuration: '8s' }} />
              <line x1="0" y1="50%" x2="100%" y2="50%" className="laser-coordinate-grid" />
              <line x1="0" y1="70%" x2="100%" y2="70%" className="laser-coordinate-grid" style={{ animationDirection: 'reverse', animationDuration: '10s' }} />
              <line x1="0" y1="90%" x2="100%" y2="90%" className="laser-coordinate-grid" />
            </g>

            {/* Glowing Main Laser Beams with dynamic sweeps and pulse frequency */}
            <line x1="0" y1="20%" x2="100%" y2="80%" stroke="url(#laserGrad1)" strokeWidth="2.5" filter="url(#laserGlow)" className="laser-anim-sweep1" />
            <line x1="100%" y1="10%" x2="0%" y2="90%" stroke="url(#laserGrad2)" strokeWidth="2.5" filter="url(#laserGlow)" className="laser-anim-sweep2" />
            
            {/* Cross cutting telemetry beams with active sweep response */}
            <line x1="15%" y1="0%" x2="85%" y2="100%" stroke="url(#laserGrad1)" strokeWidth="1.5" filter="url(#laserGlow)" className="laser-anim-sweep2" />
            <line x1="85%" y1="0%" x2="15%" y2="100%" stroke="url(#laserGrad2)" strokeWidth="1.5" filter="url(#laserGlow)" className="laser-anim-sweep1" />
            
            <line x1="0%" y1="45%" x2="100%" y2="55%" stroke="url(#radialLaser)" strokeWidth="2" filter="url(#laserGlow)" className="laser-main-axis" />
            
            {/* High-tech Target Reticle with rotations and pulsating rays */}
            <circle cx="50%" cy="50%" r="160" fill="none" stroke="#C5A059" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="5 20" filter="url(#laserGlow)" className="animate-[spin_40s_linear_infinite] laser-scanner-reticle" />
            <circle cx="50%" cy="50%" r="80" fill="none" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="2 10" className="animate-[spin_20s_linear_infinite_reverse]" />
            
            {/* Active glowing nodes */}
            <circle cx="21%" cy="21%" r="5" fill="#D4AF37" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="21%" cy="21%" r="3.5" fill="#E5C384" />
            
            <circle cx="79%" cy="79%" r="5" fill="#D4AF37" className="animate-ping" style={{ animationDuration: '4.5s' }} />
            <circle cx="79%" cy="79%" r="3.5" fill="#E5C384" />

            <circle cx="50%" cy="50%" r="4" fill="#C5A059" className="animate-pulse" />
          </svg>
          {/* Subtle light center radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.12)_0%,transparent_60%)] pointer-events-none" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#C5A059] font-mono text-xs uppercase tracking-[0.25em] mb-3">Especialidades B2B</h2>
            <p className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight leading-tight">
              Nossos 3 Pilares de Tração Comercial
            </p>
            <p className="text-[#A1A1AA] text-sm sm:text-base font-light mt-4">
              Engenharia estratégica desenhada para converter desconhecidos em reuniões comerciais qualificadas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Pilar 1: WhatsApp IA */}
            <div className="bg-[#0F0F12] border border-[#1A1A1C] p-8 flex flex-col justify-between hover:border-[#C5A059]/40 transition-all duration-300">
              <div>
                <div className="h-12 w-12 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-8 font-serif italic text-xl">
                  01
                </div>
                <h3 className="text-xl font-serif text-white mb-4">
                  Automação & Funcionários IA no WhatsApp
                </h3>
                <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed mb-6">
                  Criamos e integramos agentes baseados em IA que representam a sua empresa exatamente como um consultor humano faria. Eles funcionam 24 horas por dia qualificando os leads, quebrando dúvidas frequentes e agendando reuniões.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                    <span>Tempo de resposta inferior a 3 segundos</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                    <span>Triagem inteligente de leads frios e quentes</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                    <span>Conexão direta com seu sistema de agendamento comercial</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#121215] border border-[#1A1A1C] p-4 text-[10px] font-mono uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#C5A059] fill-[#C5A059]/20" />
                <span>BENEFÍCIO: Abordagem instantânea que elimina o tempo de resposta lento</span>
              </div>
            </div>

            {/* Pilar 2: Criação de Sites */}
            <div className="bg-[#0F0F12] border border-[#1A1A1C] p-8 flex flex-col justify-between hover:border-[#C5A059]/40 transition-all duration-300">
              <div>
                <div className="h-12 w-12 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-8 font-serif italic text-xl">
                  02
                </div>
                <h3 className="text-xl font-serif text-white mb-4">
                  Páginas & Landing Pages de Elite
                </h3>
                <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed mb-6">
                  Criamos páginas comerciais com foco obsessivo em conversão de audiência qualificada. Desenvolvemos com códigos limpos estruturados para serem rápidos, responsivos, com excelente SEO e com gatilhos persuasivos de design.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                    <span>Performance nota 95+ no Google PageSpeed</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                    <span>Arquitetura de conteúdo persuasiva (Copywriting B2B)</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                    <span>Design conceitual e alta adaptabilidade de telas</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#121215] border border-[#1A1A1C] p-4 text-[10px] font-mono uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#C5A059] fill-[#C5A059]/20" />
                <span>BENEFÍCIO: Máxima credibilidade digital instantânea corporativa</span>
              </div>
            </div>

            {/* Pilar 3: Gestão de Tráfego */}
            <div className="bg-[#0F0F12] border border-[#1A1A1C] p-8 flex flex-col justify-between hover:border-[#C5A059]/40 transition-all duration-300">
              <div>
                <div className="h-12 w-12 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-8 font-serif italic text-xl">
                  03
                </div>
                <h3 className="text-xl font-serif text-white mb-4">
                  Gestão de Tráfego de Alta Performance
                </h3>
                <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed mb-6">
                  Anúncios direcionados ao seu cliente ideal no Google, Instagram e Facebook Ads. Planejamos campanhas de funis de médio a alto ticket que garantem que sua marca apareça para quem realmente quer assinar seu contrato hoje.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                    <span>Otimização científica do custo por Lead qualificado</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                    <span>Métricas financeiras reais e rastreáveis na ponta</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                    <span>Escala segura baseada em dados reais</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#121215] border border-[#1A1A1C] p-4 text-[10px] font-mono uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#C5A059] fill-[#C5A059]/20" />
                <span>BENEFÍCIO: Escoamento de leads refinados com intenção real de compra</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Segment Area - CRM e Automação */}
      <section id="simulator-section" className="py-24 bg-[#0F0F12] border-b border-[#1A1A1C] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C5A059] font-bold font-mono text-xs uppercase tracking-[0.2em] bg-[#C5A059]/10 border border-[#C5A059]/30 px-3 py-1 rounded-full">
              Automação Interativa 🇧🇷
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-white mt-5 tracking-tight">
              Demonstração ao Vivo do Nosso Fluxo Comercial
            </h2>
            <p className="text-[#A1A1AA] text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
              Veja a tecnologia funcionando. Use o simulador de CRM inteligente abaixo para rodar nossa IA na sua empresa, ou ajuste a calculadora para prever seu ROI correspondente.
            </p>
          </div>

          <div className="space-y-12">
            
            {/* Interactive Tab Controls */}
            <div className="flex justify-center">
              <div className="bg-[#121215] p-1.5 rounded-none border border-[#1A1A1C] flex gap-2">
                <button 
                  onClick={() => scrollTo('simulator')}
                  className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-none px-6 py-3 flex items-center gap-2 transition-all shadow-md"
                  id="tab-btn-sim"
                >
                  <Bot className="h-3.5 w-3.5" /> 1. Simulador de CRM Inteligente
                </button>
                <button 
                  onClick={() => scrollTo('roi-calculator')}
                  className="hover:text-white text-[#A1A1AA] font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-none px-6 py-3 flex items-center gap-2 transition-all"
                  id="tab-btn-roi"
                >
                  <DollarSign className="h-3.5 w-3.5 text-[#C5A059]" /> 2. Calculadora de ROI
                </button>
              </div>
            </div>

            {/* Main Interactive Grid (Forms & Results side by side) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Simulated Live CRM UI (Português de Brasil) */}
              <div id="simulator" className="lg:col-span-7 bg-[#121215] border border-[#1A1A1C] rounded-none p-6 sm:p-8 relative">
                
                {/* Header of CRM widget */}
                <div className="flex items-center justify-between border-b border-[#1A1A1C] pb-6 mb-6">
                  <div>
                    <h3 className="text-lg font-serif text-white flex items-center gap-2">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
                      </span>
                      Painel CRM • LF7 Leads V3
                    </h3>
                    <p className="text-[10px] text-[#71717A] font-mono mt-1 uppercase tracking-wider">Interface Integrada de WhatsApp IA</p>
                  </div>
                  {simulationStep > 0 && (
                    <button 
                      onClick={resetSimulator}
                      className="text-[#A1A1AA] hover:text-[#C5A059] flex items-center gap-1.5 text-[10px] font-bold py-1.5 px-3 border border-[#1A1A1C] hover:border-[#C5A059]/40 rounded-none transition-all uppercase tracking-wider font-mono bg-[#0F0F12]"
                    >
                      <RotateCcw className="h-3 w-3" /> Reiniciar
                    </button>
                  )}
                </div>

                {simulationStep === 0 && (
                  <form onSubmit={handleStartSimulation} className="space-y-6">
                    <div className="bg-[#0F0F12] p-4 border border-[#1A1A1C] text-xs text-[#A1A1AA] leading-relaxed mb-2 flex gap-3">
                      <Sparkles className="h-5 w-5 text-[#C5A059] shrink-0" />
                      <span>Insira suas informações abaixo. Nosso motor inteligente executará uma chamada de IA baseada no Gemini para formular o roteiro e encenar o fluxo completo.</span>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Nome da Empresa Comercial *</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Construtora Alvorada, Clínica Harmony..."
                        required
                        value={simulatorCompany}
                        onChange={(e) => setSimulatorCompany(e.target.value)}
                        className="w-full bg-[#0F0F12] border border-[#1A1A1C] focus:border-[#C5A059] rounded-none px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]/50 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Segmento Operacional</label>
                        <select 
                          value={simulatorSegment} 
                          onChange={(e) => setSimulatorSegment(e.target.value)}
                          className="w-full bg-[#0F0F12] border border-[#1A1A1C] focus:border-[#C5A059] rounded-none px-4 py-3.5 text-sm text-white focus:outline-none transition-all cursor-pointer"
                        >
                          {segments.map(seg => (
                            <option key={seg.id} value={seg.id} className="bg-[#121215] text-white">{seg.icon} {seg.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Dificuldade Atual</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Contatos frios, sem vendas..."
                          value={simulatorChallenges}
                          onChange={(e) => setSimulatorChallenges(e.target.value)}
                          className="w-full bg-[#0F0F12] border border-[#1A1A1C] focus:border-[#C5A059] rounded-none px-4 py-3.5 text-sm text-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold py-4 rounded-none text-center flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-widest"
                      id="submit-simular"
                    >
                      <Play className="h-4 w-4 fill-black text-black" /> Construir Estratégia de IA
                    </button>
                  </form>
                )}

                {simulationStep >= 1 && (
                  <div className="space-y-6">
                    {/* Kanban Simulator */}
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Status do Lead no CRM da LF7:</h4>
                      <div className="grid grid-cols-4 gap-2 text-center text-[9px] sm:text-xs">
                        
                        <div className={`p-2.5 rounded-none border transition-all ${crmColumn === 'captured' ? 'bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059] font-bold shadow-sm' : 'bg-[#0F0F12] border-[#1A1A1C] text-[#71717A]'}`}>
                          <div className="truncate font-mono font-bold">1. CAPTURADO</div>
                          {crmColumn === 'captured' && <div className="mt-1 text-[8px] sm:text-[9px] bg-[#C5A059] text-black font-sans py-0.5 px-1.5 rounded-none inline-block">Formulário Entrou</div>}
                        </div>

                        <div className={`p-2.5 rounded-none border transition-all ${crmColumn === 'qualifying' ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#C5A059] font-bold shadow-sm' : 'bg-[#0F0F12] border-[#1A1A1C] text-[#71717A]'}`}>
                          <div className="truncate font-mono font-bold">2. TRIAREM IA</div>
                          {crmColumn === 'qualifying' && <div className="mt-1 text-[8px] sm:text-[9px] bg-[#C5A059] text-black font-sans py-0.5 px-1.5 rounded-none inline-block animate-pulse">Avaliando Perfil</div>}
                        </div>

                        <div className={`p-2.5 rounded-none border transition-all ${crmColumn === 'hot' ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059] font-bold shadow-sm' : 'bg-[#0F0F12] border-[#1A1A1C] text-[#71717A]'}`}>
                          <div className="truncate font-mono font-bold">3. QUALIFICADO</div>
                          {crmColumn === 'hot' && <div className="mt-1 text-[8px] sm:text-[9px] bg-[#C5A059] text-black font-sans py-0.5 px-1.5 rounded-none inline-block animate-pulse font-mono">Agente Pronto</div>}
                        </div>

                        <div className={`p-2.5 rounded-none border transition-all ${crmColumn === 'scheduled' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold shadow-sm' : 'bg-[#0F0F12] border-[#1A1A1C] text-[#71717A]'}`}>
                          <div className="truncate font-mono font-bold">4. AGENDADO</div>
                          {crmColumn === 'scheduled' && <div className="mt-1 text-[8px] sm:text-[9px] bg-emerald-500 text-black font-sans py-0.5 px-1.5 rounded-none inline-block uppercase tracking-wider">Confirmado 📅</div>}
                        </div>

                      </div>
                    </div>

                    {/* Active Card details inside CRM */}
                    <div className="bg-[#0F0F12] p-4 border border-[#1A1A1C] rounded-none">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white capitalize px-2 py-0.5 bg-[#121215] rounded-none border border-[#1A1A1C] font-mono tracking-tight">{simulatorCompany}</span>
                          <span className="text-[9px] text-[#71717A] font-mono uppercase">Segmento: {segments.find(s => s.id === simulatorSegment)?.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#C5A059] tracking-wider uppercase">Engenharia Ativa</span>
                      </div>
                      {isLoadingAPI ? (
                        <div className="py-6 text-center text-xs text-[#A1A1AA] font-mono flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#C5A059] border-t-transparent"></div>
                          Consultando IA e customizando roteiro corporativo de fechamento...
                        </div>
                      ) : (
                        <div className="space-y-2.5 text-xs">
                          {customAutomationScript && (
                            <p className="text-neutral-300 leading-relaxed"><strong className="text-[#C5A059] font-bold uppercase tracking-wider font-mono mr-1">Roteiro IA WhatsApp:</strong> {customAutomationScript}</p>
                          )}
                          {painAnalysis && (
                            <p className="text-[#A1A1AA] leading-relaxed"><strong className="text-white/80 font-bold uppercase tracking-wider font-mono mr-1">Pontos de Atrito Mapeados:</strong> {painAnalysis}</p>
                          )}
                          {suggestedCampaigns && (
                            <p className="text-[#A1A1AA] leading-relaxed"><strong className="text-white/80 font-bold uppercase tracking-wider font-mono mr-1">Campanhas Propostas:</strong> {suggestedCampaigns}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* WhatsApp chat container */}
                    <div className="border border-[#1A1A1C] rounded-none bg-[#0F0F12] overflow-hidden">
                      <div className="bg-[#121215] border-b border-[#1A1A1C] px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span className="text-xs font-bold text-white">Abordagem do Robô Inteligente (Simulação)</span>
                        </div>
                        <span className="text-[10px] text-[#71717A] font-mono uppercase">WhatsApp Cloud API</span>
                      </div>

                      <div className="p-4 h-64 overflow-y-auto space-y-3 flex flex-col justify-end bg-[#0A0A0B]/60 shadow-inner">
                        {activeChatMessages.map((msg, idx) => (
                          <div 
                            key={idx}
                            className={`max-w-[85%] rounded-none px-4 py-3 text-xs leading-relaxed ${
                              msg.sender === 'ai' 
                                ? 'bg-[#C5A059]/15 text-[#E5E5E5] self-start border border-[#C5A059]/30 font-sans' 
                                : 'bg-[#1D1D21] border border-[#2E2E33] text-neutral-200 self-end'
                            }`}
                          >
                            {msg.text}
                          </div>
                        ))}

                        {isTyping && (
                          <div className="bg-[#121215] text-[#C5A059] self-start text-[10px] px-3.5 py-1.5 border border-[#1A1A1C] rounded-none flex items-center gap-2 font-mono uppercase tracking-wider">
                            <span className="inline-block animate-bounce font-extrabold">.</span>
                            <span className="inline-block animate-bounce delay-100 font-extrabold">.</span>
                            <span className="inline-block animate-bounce delay-200 font-extrabold">.</span>
                            <span>IA da LF7 está redigindo</span>
                          </div>
                        )}
                        
                        <div ref={chatEndRef} />
                      </div>
                    </div>

                    {/* Complete simulated flow block */}
                    {simulationStep === 2 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#121215] border border-emerald-500/50 p-6 rounded-none text-center"
                      >
                        <div className="h-10 w-10 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] mx-auto mb-3">
                          <Check className="h-5 w-5" />
                        </div>
                        <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-widest font-mono">Simulação de Sucesso!</h4>
                        <p className="text-[#A1A1AA] text-xs mt-2 max-w-lg mx-auto leading-relaxed">
                          O robô com inteligência artificial estabeleceu diálogo realista sobre <strong className="text-white font-medium">{simulatorChallenges}</strong>, demonstrou as possibilidades de venda aplicadas e cadastrou a oportunidade de reunião integrada sem intervenção humana de sua equipe.
                        </p>
                        <button 
                          onClick={() => scrollTo('form-leads')}
                          className="mt-5 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-none text-[10px] tracking-widest uppercase transition-all"
                        >
                          Agendar Diagnóstico Gratuito 📲
                        </button>
                      </motion.div>
                    )}

                  </div>
                )}
              </div>

              {/* Simulated ROI Calculator inside B2B Portuguese */}
              <div id="roi-calculator" className="lg:col-span-5 bg-[#121215] border border-[#1A1A1C] rounded-none p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-[#C5A059]" />
                  <h3 className="text-lg font-serif text-white">Calculadora Comercial</h3>
                </div>
                <p className="text-[#A1A1AA] text-xs leading-relaxed mb-8">
                  Configure as métricas mensais do seu negócio para descobrir o volume de faturamento desperdiçado por lentidão operacional.
                </p>

                <div className="space-y-6">
                  
                  {/* Field 1: Volume of Leads */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-2.5">
                      <span className="text-[#A1A1AA] uppercase tracking-wider font-bold">Leads Recebidos / Mês</span>
                      <span className="text-[#C5A059] font-extrabold">{leadsCount} contatos</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="1000" 
                      step="10"
                      value={leadsCount} 
                      onChange={(e) => setLeadsCount(Number(e.target.value))}
                      className="w-full h-1 bg-[#0F0F12] rounded-none appearance-none cursor-pointer accent-[#C5A059]"
                    />
                  </div>

                  {/* Field 2: Average Ticket */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-2.5">
                      <span className="text-[#A1A1AA] uppercase tracking-wider font-bold">Ticket Médio de Venda</span>
                      <span className="text-[#C5A059] font-extrabold">R$ {averageTicket.toLocaleString('pt-BR')}</span>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="20000" 
                      step="100"
                      value={averageTicket} 
                      onChange={(e) => setAverageTicket(Number(e.target.value))}
                      className="w-full h-1 bg-[#0F0F12] rounded-none appearance-none cursor-pointer accent-[#C5A059]"
                    />
                  </div>

                  {/* Field 3: Response Speed */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-2.5">
                      <span className="text-[#A1A1AA] uppercase tracking-wider font-bold">Tempo de Resposta Comercial</span>
                      <span className="text-red-400 font-extrabold">{averageDelay >= 180 ? 'Mais de 3h' : `${averageDelay} minutos`}</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="240" 
                      step="5"
                      value={averageDelay} 
                      onChange={(e) => setAverageDelay(Number(e.target.value))}
                      className="w-full h-1 bg-[#0F0F12] rounded-none appearance-none cursor-pointer accent-[#C5A059]"
                    />
                  </div>

                  {/* Field 4: Current Conversion Rate */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-2.5">
                      <span className="text-[#A1A1AA] uppercase tracking-wider font-bold">Taxa de Conversão Atual</span>
                      <span className="text-[#C5A059] font-extrabold">{currentConversion}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="20" 
                      step="0.5"
                      value={currentConversion} 
                      onChange={(e) => setCurrentConversion(Number(e.target.value))}
                      className="w-full h-1 bg-[#0F0F12] rounded-none appearance-none cursor-pointer accent-[#C5A059]"
                    />
                  </div>

                  {/* Computations result */}
                  <div className="mt-8 border-t border-[#1A1A1C] pt-6 space-y-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A1A1AA] font-bold font-mono uppercase tracking-wider">Perda de oportunidade:</span>
                      <span className="text-[#C5A059] font-mono font-bold">-{lossRate}% de taxa de conversão</span>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A1A1AA] font-bold font-mono uppercase tracking-wider">Prejuízo Financeiro Mês:</span>
                      <span className="text-red-400 font-mono font-bold">R$ {financialLoss.toLocaleString('pt-BR')}</span>
                    </div>

                    {/* Recuperação com LF7 */}
                    <div className="bg-gradient-to-r from-[#0F0F12] to-[#C5A059]/10 p-5 border border-[#C5A059]/20 rounded-none">
                      <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#C5A059] font-bold">Faturamento Recuperado • Estimado</div>
                      <div className="text-xl sm:text-2xl font-serif text-white mt-1.5">
                        + R$ {recoveredRevenue.toLocaleString('pt-BR')} / Mês
                      </div>
                      <p className="text-[11px] text-[#A1A1AA] mt-2 leading-relaxed">
                        Reduzindo o atendimento para 3 segundos com robôs IA, estimamos a recuperação média de <strong className="text-white font-bold">{recoveredLeads} vendas mensais</strong> anteriormente perdidas no limbo.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Por que escolher a LF7? - Diferenciais */}
      <section className="py-24 bg-[#0A0A0B] border-b border-[#1A1A1C] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[#C5A059] font-mono text-xs uppercase tracking-[0.25em] mb-3">Compromisso e Qualidade</h2>
            <p className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
              A Diferença de Unir IA & Performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-[#121215] p-8 border border-[#1A1A1C] rounded-none hover:border-[#C5A059]/30 transition-all duration-300">
              <span className="text-3xl text-[#C5A059] block mb-5">👁️</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Visão 360 do Funil</h4>
              <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed">
                Analisamos e integramos desde a segmentação de anúncios até o carregamento do site de alta performance, roteiro de WhatsApp e agendamento CRM de vendas estruturado.
              </p>
            </div>

            <div className="bg-[#121215] p-8 border border-[#1A1A1C] rounded-none hover:border-[#C5A059]/30 transition-all duration-300">
              <span className="text-3xl text-[#C5A059] block mb-5">🤖</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Higienização Inteligente</h4>
              <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed">
                Oferecemos conexões nativas com CRM líderes de mercado do Brasil (RD Station, ActiveCampaign, HubSpot). Seus dados entram qualificados, pré-triados e estruturados.
              </p>
            </div>

            <div className="bg-[#121215] p-8 border border-[#1A1A1C] rounded-none hover:border-[#C5A059]/30 transition-all duration-300">
              <span className="text-3xl text-[#C5A059] block mb-5">⚡</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Velocidade Crítica</h4>
              <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed">
                Nossos códigos minimizam o tempo de download eliminando sobrecargas. Menor lentidão significa melhor custo de conversão por anúncio digital nas plataformas.
              </p>
            </div>

            <div className="bg-[#121215] p-8 border border-[#1A1A1C] rounded-none hover:border-[#C5A059]/30 transition-all duration-300">
              <span className="text-3xl text-[#C5A059] block mb-5">📈</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Tom de Voz Corporativo</h4>
              <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed">
                Desenhamos robôs customizados que usam linguagem refinada, empática e estritamente educada. Adequamos os prompts de acordo com o padrão do seu público alvo.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-[#0F0F12] via-[#0A0A0B] to-[#0F0F12] border-b border-[#1A1A1C] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-[#C5A059] font-mono text-xs uppercase tracking-[0.25em] mb-3">Histórias de Sucesso</h2>
              <p className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
                Quem Confia e Multiplica com a LF7
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  setAutoplayTestimonials(false);
                  setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                }}
                className="w-12 h-12 border border-[#1A1A1C] bg-[#121215]/80 hover:border-[#C5A059]/40 text-[#71717A] hover:text-[#E5C384] flex items-center justify-center transition-all cursor-pointer hover:bg-[#121215]"
                aria-label="Depoimento Anterior"
                id="btn-prev-testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => {
                  setAutoplayTestimonials(false);
                  setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
                }}
                className="w-12 h-12 border border-[#1A1A1C] bg-[#121215]/80 hover:border-[#C5A059]/40 text-[#71717A] hover:text-[#E5C384] flex items-center justify-center transition-all cursor-pointer hover:bg-[#121215]"
                aria-label="Próximo Depoimento"
                id="btn-next-testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Active Slider Card */}
          <div 
            className="bg-[#121215] border border-[#1A1A1C] hover:border-[#C5A059]/20 transition-all duration-300 relative rounded-none shadow-[20px_20px_0_rgba(10,10,11,0.5)]"
            onMouseEnter={() => setAutoplayTestimonials(false)}
            onMouseLeave={() => setAutoplayTestimonials(true)}
          >
            {/* Elegant visual badge */}
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-gradient-to-r from-[#886221] via-[#C5A059] to-[#E5C384] text-black text-[9px] font-mono font-bold uppercase tracking-widest px-4 py-1.5 shadow-lg">
              Resultado LF7 Automações
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Highlight and client info col */}
              <div className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#1A1A1C] flex flex-col justify-between bg-gradient-to-br from-[#121215] to-[#0A0A0B]">
                <div>
                  <span className="text-[#C5A059] font-mono text-[10px] uppercase tracking-widest mb-4 block">{testimonials[currentTestimonial].segment}</span>
                  
                  {/* Result highlighted with custom heavy text and gradient line */}
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight mb-3">
                    {testimonials[currentTestimonial].result}
                  </h3>
                  <p className="text-[#E5C384] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6">
                    {testimonials[currentTestimonial].highlight}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <div className="relative w-14 h-14 shrink-0 border border-[#C5A059]/30 p-0.5 bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover rounded-none grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-xs text-[#71717A] mt-0.5">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </div>

              {/* Quotation text and detailed review col */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between relative bg-[#121215]/40">
                {/* Large semi-transparent Quote icon acting as background */}
                <Quote className="absolute right-8 bottom-8 text-[#1A1A1C] h-40 w-40 pointer-events-none z-0" strokeWidth={0.5} />

                <div className="relative z-10">
                  {/* Rating star display */}
                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>

                  {/* AnimatePresence for smooth text transitions during slides */}
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={currentTestimonial}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#D1D1D6] font-serif font-light text-base sm:text-lg leading-relaxed italic"
                    >
                      &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="relative z-10 mt-10 pt-8 border-t border-[#1A1A1C] flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest">Estudo de Caso Auditado</span>
                  <a 
                    href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20vi%20o%20caso%20de%20sucesso%20no%20site%20e%20gostaria%20de%20resultados%20similares%20de%20automa%C3%A7%C3%A3o%20e%20CRM!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C5A059] hover:text-[#E5C384] text-xs font-bold uppercase tracking-widest flex items-center gap-2 group cursor-pointer"
                    id={`testimonial-cta-${testimonials[currentTestimonial].id}`}
                  >
                    Quero estes resultados
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

              </div>

            </div>
          </div>

          {/* Carousel Dot Indicators */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAutoplayTestimonials(false);
                  setCurrentTestimonial(idx);
                }}
                className={`h-2.5 transition-all duration-300 rounded-none cursor-pointer ${
                  currentTestimonial === idx 
                    ? 'w-8 bg-gradient-to-r from-[#C5A059] to-[#E5C384]' 
                    : 'w-2.5 bg-[#1A1A1C] hover:bg-[#71717A]/40'
                }`}
                aria-label={`Ir para o depoimento ${idx + 1}`}
                id={`btn-dot-testimonial-${idx}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. FAQ - Perguntas Frequentes */}
      <section id="faq" className="py-24 bg-[#0F0F12] border-b border-[#1A1A1C] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-20">
            <h2 className="text-[#C5A059] font-mono text-xs uppercase tracking-[0.25em] mb-3">Objeções Resolvidas</h2>
            <p className="text-3xl sm:text-4xl font-serif font-light text-white tracking-tight">
              Tudo o que você precisa saber antes de iniciar
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#121215] border border-[#1A1A1C] rounded-none overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 sm:px-8 text-left flex items-center justify-between text-white font-semibold hover:text-[#C5A059] transition-colors gap-4"
                  id={`faq-btn-${idx}`}
                >
                  <span className="text-sm sm:text-base font-serif text-left leading-relaxed">{item.q}</span>
                  <ChevronDown className={`h-4 w-4 text-[#C5A059] shrink-0 transform transition-transform duration-350 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-6 text-[#A1A1AA] text-xs sm:text-sm leading-relaxed border-t border-[#1A1A1C] pt-4 font-sans">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Rodapé e CTA Final */}
      <section id="form-leads" className="py-24 bg-[#0A0A0B] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="max-w-3xl mx-auto mb-16">
            <span className="text-[#C5A059] font-bold font-mono text-xs uppercase tracking-[0.2em] bg-[#C5A059]/10 border border-[#C5A059]/30 px-3 py-1 rounded-full">
              Sessão Estratégica Gratuita
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white mt-6 tracking-tight mb-4">
              Comece a recuperar sua receita comercial hoje
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed font-light">
              Agende um diagnóstico gratuito com nosso especialista. Analisaremos o cenário operacional de sua empresa, identificaremos furos no funil e desenharemos o plano ideal para maximizar sua lucratividade.
            </p>
          </div>

          <div className="bg-[#0F0F12] border border-[#1A1A1C] p-8 sm:p-12 rounded-none max-w-2xl mx-auto text-center relative overflow-hidden">
            {/* Elegant top line gold accent */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#886221] via-[#C5A059] to-[#E5C384]"></div>

            <div className="mb-6">
              <span className="text-4xl">📊</span>
              <h3 className="text-lg font-serif text-white mt-4 font-bold">Diagnóstico Comercial Personalizado</h3>
              <p className="text-[11px] text-[#A1A1AA] mt-2 leading-relaxed font-mono uppercase tracking-wider">
                Vagas limitadas para este semestre devido à nossa alta demanda
              </p>
            </div>

            <div className="space-y-4">
              <a 
                href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20meu%20diagn%C3%B3stico%20de%20automa%C3%A7%C3%A3o%20e%20CRM%20gratuito!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-black font-extrabold py-5 rounded-none text-center flex items-center justify-center gap-3 transition-all tracking-widest text-xs uppercase duration-350"
                id="footer-card-cta"
              >
                <MessageSquare className="h-4 w-4 fill-black text-black shrink-0" /> Agendar Via WhatsApp
              </a>

              <p className="text-[9px] text-[#71717A] font-mono uppercase tracking-wider">
                Sem compromisso • Diagnóstico conduzido diretamente em 15 minutos na nossa sala virtual
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate footer */}
      <footer className="border-t border-[#1A1A1C] bg-[#0F0F12] py-14 text-center text-xs text-[#71717A] font-mono leading-relaxed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]"></span>
            <span className="text-white font-extrabold text-xs sm:text-sm tracking-[0.25em] uppercase font-sans">LF7 Marketing & Automações Inteligentes</span>
          </div>
          <p className="max-w-md mx-auto text-[11px] text-[#71717A]">
            A LF7 impulsiona dezenas de empresas através da convergência perfeita entre inteligência artificial conversacional estruturada, páginas comerciais refinadas e tráfego massivo.
          </p>
          <div className="pt-6 border-t border-[#1A1A1C] flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-wider">
            <span>© 2026 LF7 Marketing Digital e Automações. Todos os direitos reservados.</span>
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="text-[#71717A] hover:text-[#C5A059] transition-all cursor-pointer font-bold focus:outline-none hover:scale-[1.02]"
              id="btn-privacy-policy"
            >
              Política de Privacidade
            </button>
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="text-[#71717A] hover:text-[#C5A059] transition-all cursor-pointer font-bold focus:outline-none hover:scale-[1.02]"
              id="btn-terms-of-use"
            >
              Termos de Uso
            </button>
            <span>Atuação em todo o território nacional 🇧🇷</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <a
          href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20diagn%C3%B3stico%20de%20automa%C3%A7%C3%A3o%20e%20falar%20com%20um%20especialista!"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 active:scale-95 border border-[#25D366]/60"
          aria-label="Fale conosco no WhatsApp"
          id="floating-whatsapp-btn"
        >
          {/* Pulsing Outer Ring */}
          <span className="absolute -inset-1.5 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" style={{ animationDuration: '2s' }}></span>
          
          {/* Glassmorphic Tooltip label displayed on hover */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/90 backdrop-blur-md text-[#25D366] border border-[#25D366]/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest leading-none pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-xl">
            Fale Conosco
          </span>

          <svg className="h-7 w-7 text-white" viewBox="0 0 448 512">
            <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.8c32.7 17.9 69.4 27.3 107.1 27.3h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-13.6-6.8-25-10.8-40.8-24.8-12.3-11-20.6-24.5-23-28.3-2.4-3.8-.3-5.8 1.6-7.7 1.7-1.7 3.7-4.3 5.6-6.5 1.9-2.2 2.5-3.8 3.7-6.3 1.2-2.5.6-4.6-.3-6.5-1-1.9-8.8-21.2-12.1-29.1-3.2-7.8-6.5-6.7-8.9-6.8-2.3-.1-5-.1-7.6-.1-2.6 0-6.8 1-10.4 4.9-3.6 3.9-13.9 13.6-13.9 33.1s14.3 38.3 16.3 41c2.1 2.7 28.2 43.1 68.3 60.3 9.6 4.1 17.1 6.6 23 8.5 9.7 3.1 18.5 2.7 25.5 1.7 7.7-1.1 23.7-9.7 27-18.5 3.4-8.8 3.4-16.2 2.3-18-1-1.8-3.6-2.8-9.1-5.5z"/>
          </svg>
        </a>
      </motion.div>

      {/* Privacy Policy Modal overlay */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#121215] to-[#0A0A0B] border border-[#C5A059]/30 rounded-none shadow-[0_0_50px_rgba(197,160,89,0.2)] flex flex-col focus:outline-none"
              id="privacy-modal-body"
            >
              {/* Header Gold Gradient Decor */}
              <div className="h-[4px] w-full bg-gradient-to-r from-[#886221] via-[#C5A059] to-[#E5C384]" />
              
              <div className="p-6 sm:p-10 text-left relative">
                {/* Close X Button */}
                <button
                  onClick={() => setIsPrivacyOpen(false)}
                  className="absolute top-6 right-6 text-[#71717A] hover:text-white transition-colors cursor-pointer p-1"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <span className="h-2 w-2 rounded-full bg-[#C5A059] animate-pulse" />
                  <span className="text-[#C5A059] font-mono text-[10px] uppercase tracking-widest font-bold">LF7 Automações • Segurança Digital</span>
                </div>

                <h2 className="text-2xl font-serif text-white font-bold leading-tight mb-6">
                  Política de Privacidade
                </h2>

                <div className="space-y-6 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-sans overflow-y-auto pr-3 max-h-[48vh] scrollbar-thin scrollbar-thumb-[#C5A059]/30">
                  <p>
                    A sua privacidade é de extrema relevância para nós da LF7. Esta Política de Privacidade formaliza o nosso compromisso inabalável com a proteção, transparência e segurança de todos os dados pessoais fornecidos ao navegar ou preencher simulações no nosso portal.
                  </p>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold font-serif text-sm em-base uppercase tracking-wider border-b border-[#1A1A1C] pb-1 text-[#E5C384]">
                      1. Coleta legítima de Dados
                    </h3>
                    <p>
                      Coletamos informações voluntariamente cedidas por você através de nossos simuladores corporativos e botões de contato, incluindo:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-[#8F8F95]">
                      <li>Dados de negócio para cálculo de ROI (número de leads mensais, faturamento/ticket médio, atraso na resposta de contatos e nicho de mercado);</li>
                      <li>Dados de contato pessoal ou corporativo (Número de WhatsApp e nome corporativo, caso utilize os canais integrados);</li>
                      <li>Informações técnicas automáticas de sessão (endereço IP criptografado, cookies utilitários e dados gerais de navegador).</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold font-serif text-sm em-base uppercase tracking-wider border-b border-[#1A1A1C] pb-1 text-[#E5C384]">
                      2. Tratamento e Finalidade (LGPD)
                    </h3>
                    <p>
                      Todo o tratamento de dados pessoais pela LF7 ocorre em estrita observância à Lei Geral de Proteção de Dados (Lei nº 13.709/2018), fundamentado no consentimento e no legítimo interesse profissional de responder a consultas institucionais:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-[#8F8F95]">
                      <li>Retorno de Contato: Atender de forma ágil e personalizada às simulações e pedidos de diagnósticos gratuitos enviados;</li>
                      <li>Metodologias: Customizar as demonstrações táticas do simulador de CRM inteligente às dores específicas do seu segmento comercial;</li>
                      <li>Conteúdo Estratégico: Nutrir com insights sobre o ecossistema conversacional e inteligência artificial aplicada a conversões, assegurando sempre o livre opt-out.</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold font-serif text-sm em-base uppercase tracking-wider border-b border-[#1A1A1C] pb-1 text-[#E5C384]">
                      3. Segurança da Informação
                    </h3>
                    <p>
                      Operamos sob rígidos padrões de segurança digital. Implementamos criptografia de ponta a ponta em toda transmissão de dados de formulário, blindagem contra ataques de injeção de scripts e parcerias com os melhores provedores globais de nuvem técnica, prevenindo acessos indevidos, perdas virtuais ou alterações de registros.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold font-serif text-sm em-base uppercase tracking-wider border-b border-[#1A1A1C] pb-1 text-[#E5C384]">
                      4. Direitos Legais dos Usuários
                    </h3>
                    <p>
                      Como titular dos seus dados corporativos e pessoais, você ostenta plenos direitos sob a LGPD:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-[#8F8F95]">
                      <li>Confirmar rápida existência de tratamento dos dados na nossa base;</li>
                      <li>Solicitar retificações imediatas em casos de cadastros desatualizados;</li>
                      <li>Revogar consentimentos previamente fornecidos, forçando a eliminação definitiva de registros;</li>
                      <li>Opor-se a receber mensagens comerciais.</li>
                    </ul>
                    <p className="mt-2 text-[#71717A] text-[11px] italic">
                      Qualquer requerimento pode ser endereçado diretamente ao encarregado de dados no correio eletrônico:<strong> santanna1608@gmail.com</strong>.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold font-serif text-sm em-base uppercase tracking-wider border-b border-[#1A1A1C] pb-1 text-[#E5C384]">
                      5. Vigência e Revisões
                    </h3>
                    <p>
                      Esta Política de Privacidade poderá passar por aperfeiçoamentos contínuos para incorporação de novos protocolos e diretrizes da Autoridade Nacional de Proteção de Dados (ANPD).
                    </p>
                    <p className="text-[11px] text-[#71717A] font-mono mt-4">
                      Vigência: Atualizado em Maio de 2026.
                    </p>
                  </section>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setIsPrivacyOpen(false)}
                    className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-extrabold uppercase tracking-widest text-[10px] py-4 px-8 rounded-none transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  >
                    Fechar Termo
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms of Use Modal overlay */}
      <AnimatePresence>
        {isTermsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTermsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#121215] to-[#0A0A0B] border border-[#C5A059]/30 rounded-none shadow-[0_0_50px_rgba(197,160,89,0.2)] flex flex-col focus:outline-none"
              id="terms-modal-body"
            >
              {/* Header Gold Gradient Decor */}
              <div className="h-[4px] w-full bg-gradient-to-r from-[#886221] via-[#C5A059] to-[#E5C384]" />
              
              <div className="p-6 sm:p-10 text-left relative">
                {/* Close X Button */}
                <button
                  onClick={() => setIsTermsOpen(false)}
                  className="absolute top-6 right-6 text-[#71717A] hover:text-white transition-colors cursor-pointer p-1"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <span className="h-2 w-2 rounded-full bg-[#C5A059] animate-pulse" />
                  <span className="text-[#C5A059] font-mono text-[10px] uppercase tracking-widest font-bold">LF7 Automações • Termos de Uso</span>
                </div>

                <h2 className="text-2xl font-serif text-white font-bold leading-tight mb-6">
                  Termos de Uso Comercial
                </h2>

                <div className="space-y-6 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-sans overflow-y-auto pr-3 max-h-[48vh] scrollbar-thin scrollbar-thumb-[#C5A059]/30">
                  <p>
                    Bem-vindo ao site institucional da LF7. Ao navegar por nossas páginas, usufruir de nossos simuladores matemáticos interativos ou interagir com nossos recursos tecnológicos, você concorda irrestritamente com os termos estabelecidos a seguir.
                  </p>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold font-serif text-sm em-base uppercase tracking-wider border-b border-[#1A1A1C] pb-1 text-[#E5C384]">
                      1. Projeções e Isenções de Resultados
                    </h3>
                    <p>
                      Todo o ecossistema apresentado neste portal (incluindo o calculador de perdas por lentidão comercial e o simulador interativo de CRM conversacional) compreende ferramentas concebidas exclusivamente para fins analíticos hipotéticos, simulações ilustrativas e reflexão comercial.
                    </p>
                    <p>
                      A LF7 não oferece garantias contratuais de receitas fixas automáticas ou lucros absolutos com o uso isolado do software, dado que a taxa de vendas real está vinculada a variadas esferas sob gestão do próprio cliente, tais como atendimento das equipes comerciais de venda e qualidade na captação estratégica de tráfego.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold font-serif text-sm em-base uppercase tracking-wider border-b border-[#1A1A1C] pb-1 text-[#E5C384]">
                      2. Propriedade Intelectual e Proteção Visual
                    </h3>
                    <p>
                      Todas as criações de código-fonte deste site Web, designs inovadores, fluxos simulados de engajamento por robôs e a **Rede e Teia de Laser de Alta Frequência em Movimento** que decora a seção de serviços representam propriedade de propriedade exclusiva da marca LF7 protegidas legalmente. É terminantemente proibida qualquer clonagem, duplicação ou engenharia reversa sem nossa autorização prévia por escrito.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold font-serif text-sm em-base uppercase tracking-wider border-b border-[#1A1A1C] pb-1 text-[#E5C384]">
                      3. Conduta Recomendada
                    </h3>
                    <p>
                      Ao fazer uso dos nossos simuladores, o usuário concorda em:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-[#8F8F95]">
                      <li>Fornecer dados transparentes e fidedignos sob pena de obter insights errôneos de ROI;</li>
                      <li>Não tentar adulterar códigos do portal ou realizar varreduras não solicitadas de vulnerabilidade técnica;</li>
                      <li>Manter comunicações civilizadas, de elevado profissionalismo, ao avançar para os canais de atendimento direto via WhatsApp.</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold font-serif text-sm em-base uppercase tracking-wider border-b border-[#1A1A1C] pb-1 text-[#E5C384]">
                      4. Elegibilidade e Resolução de Litígios
                    </h3>
                    <p>
                      Para dirimir quaisquer eventuais questionamentos judiciais ou contendas relativas a estes termos de conduta, as partes elegem de forma definitiva a comarca da capital do Estado do Rio de Janeiro - RJ, com renúncia tácita a qualquer outra localidade.
                    </p>
                    <p className="text-[11px] text-[#71717A] font-mono mt-4">
                      Versão unificada oficial: Maio de 2026.
                    </p>
                  </section>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setIsTermsOpen(false)}
                    className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-extrabold uppercase tracking-widest text-[10px] py-4 px-8 rounded-none transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  >
                    Aceitar e Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
