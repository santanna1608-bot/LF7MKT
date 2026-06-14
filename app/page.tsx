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
  Building,
  Gauge,
  Cpu,
  Smartphone,
  Search
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

// Premium motion curves and spring configs
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const; // Out-Expo curve

const SPRING_PREMIUM = {
  type: 'spring',
  stiffness: 260,
  damping: 26
} as const;

const SPRING_TACTILE = {
  type: 'spring',
  stiffness: 400,
  damping: 15
} as const;

// Global animation variants for Stagger layouts
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItemReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: EASE_PREMIUM,
      duration: 0.8
    }
  }
};

export default function Home() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Site Simulator states
  const [siteAdSpend, setSiteAdSpend] = useState(3000);
  const [siteLeadValue, setSiteLeadValue] = useState(1500);
  const [isAnalyzingSpeed, setIsAnalyzingSpeed] = useState(false);
  const [speedAnalyzed, setSpeedAnalyzed] = useState(false);

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

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F12]/90 backdrop-blur-md border-b border-[#1A1A1C]">
        {/* Dynamic Top Bar Accent - Elegant Gold Gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#886221] via-[#C5A059] to-[#E5C384]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={SPRING_TACTILE}
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => scrollTo('hero')}
          >
            <div className="h-9 w-9 bg-[#C5A059] flex items-center justify-center font-bold text-black text-xs tracking-wider transition-colors duration-300 hover:bg-[#D4AF37]" id="hdr-logo">
              LF7
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-base leading-none tracking-tight">LF7</span>
              <span className="text-[#C5A059] font-medium text-[9px] tracking-[0.18em] uppercase mt-0.5">Marketing & IA</span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 uppercase text-[11px] tracking-widest text-[#A1A1AA]">
            <motion.button whileHover={{ y: -1, color: '#C5A059' }} whileTap={{ scale: 0.96 }} onClick={() => scrollTo('pas-section')} className="transition-colors cursor-pointer" id="nav-btn-dores">Dores do Mercado</motion.button>
            <motion.button whileHover={{ y: -1, color: '#C5A059' }} whileTap={{ scale: 0.96 }} onClick={() => scrollTo('servicos')} className="transition-colors cursor-pointer" id="nav-btn-servicos">Serviços</motion.button>
            <motion.button whileHover={{ y: -1, color: '#C5A059' }} whileTap={{ scale: 0.96 }} onClick={() => scrollTo('criacao-sites')} className="transition-colors cursor-pointer" id="nav-btn-sites">Sites de Elite</motion.button>
            <motion.button whileHover={{ y: -1, color: '#C5A059' }} whileTap={{ scale: 0.96 }} onClick={() => scrollTo('simulator')} className="transition-colors cursor-pointer" id="nav-btn-crm">Testar CRM IA</motion.button>
            <motion.button whileHover={{ y: -1, color: '#C5A059' }} whileTap={{ scale: 0.96 }} onClick={() => scrollTo('roi-calculator')} className="transition-colors cursor-pointer" id="nav-btn-roi">Calcular ROI</motion.button>
            <motion.button whileHover={{ y: -1, color: '#C5A059' }} whileTap={{ scale: 0.96 }} onClick={() => scrollTo('faq')} className="transition-colors cursor-pointer" id="nav-btn-faq">Dúvidas</motion.button>
          </nav>
 
          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a 
              whileHover={{ scale: 1.03, borderColor: 'rgba(197, 160, 89, 0.4)' }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_TACTILE}
              href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consultoria%20com%20a%20LF7!"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#1A1A1C] bg-[#0A0A0B] text-[#E5E5E5] hover:text-white rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all"
              id="header-cta-secondary"
            >
              Falar com Especialista
            </motion.a>
            <motion.button 
              whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(197, 160, 89, 0.3)' }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_TACTILE}
              onClick={() => scrollTo('simulator')}
              className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-[11px] rounded-full px-5 py-3 transition-all cursor-pointer"
              id="header-cta"
            >
              Simular Negócio
            </motion.button>
          </div>
 
          {/* Mobile hamburger icon */}
          <div className="md:hidden">
            <motion.button 
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-[#A1A1AA] hover:text-white p-2 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
 
        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ ease: EASE_PREMIUM, duration: 0.5 }}
              className="md:hidden bg-[#0F0F12] border-b border-[#1A1A1C] overflow-hidden"
            >
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="px-4 pt-2 pb-6 space-y-3 flex flex-col uppercase text-[10px] tracking-widest text-[#A1A1AA]"
              >
                <motion.button 
                  variants={staggerItemReveal}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMobileMenuOpen(false); scrollTo('pas-section'); }}
                  className="text-left hover:text-[#C5A059] py-2.5 border-b border-[#1A1A1C] cursor-pointer w-full"
                >
                  Dores do Mercado
                </motion.button>
                <motion.button 
                  variants={staggerItemReveal}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMobileMenuOpen(false); scrollTo('servicos'); }}
                  className="text-left hover:text-[#C5A059] py-2.5 border-b border-[#1A1A1C] cursor-pointer w-full"
                >
                  Serviços
                </motion.button>
                <motion.button 
                  variants={staggerItemReveal}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMobileMenuOpen(false); scrollTo('criacao-sites'); }}
                  className="text-left hover:text-[#C5A059] py-2.5 border-b border-[#1A1A1C] cursor-pointer w-full"
                >
                  Sites de Elite
                </motion.button>
                <motion.button 
                  variants={staggerItemReveal}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMobileMenuOpen(false); scrollTo('simulator'); }}
                  className="text-left hover:text-[#C5A059] py-2.5 border-b border-[#1A1A1C] cursor-pointer w-full"
                >
                  Testar CRM IA
                </motion.button>
                <motion.button 
                  variants={staggerItemReveal}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMobileMenuOpen(false); scrollTo('roi-calculator'); }}
                  className="text-left hover:text-[#C5A059] py-2.5 border-b border-[#1A1A1C] cursor-pointer w-full"
                >
                  Calcular ROI
                </motion.button>
                <motion.button 
                  variants={staggerItemReveal}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMobileMenuOpen(false); scrollTo('faq'); }}
                  className="text-left hover:text-[#C5A059] py-2.5 border-b border-[#1A1A1C] cursor-pointer w-full"
                >
                  Dúvidas
                </motion.button>
                <motion.div variants={staggerItemReveal} className="pt-4 flex flex-col gap-3">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consultoria%20com%20a%20LF7!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#1A1A1C] bg-[#0A0A0B] text-[#E5E5E5] hover:text-white rounded-full py-3.5 text-center text-[10px] font-bold uppercase tracking-widest inline-block"
                  >
                    Atendimento WhatsApp
                  </motion.a>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => { setMobileMenuOpen(false); scrollTo('simulator'); }}
                    className="bg-[#C5A059] text-black rounded-full py-3.5 text-center text-[10px] font-bold uppercase tracking-widest cursor-pointer w-full"
                  >
                    Iniciar Teste CRM IA
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 1. Hero Section */}
      <section id="hero" className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden border-b border-[#1A1A1C]">
        {/* Background Video with Zoom-out Cinemático */}
        <motion.div 
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE_PREMIUM }}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/dq3cmyhmo/video/upload/v1779901029/Desloque_imagem_para_direita_202605271230_njlazn.mp4" type="video/mp4" />
          </video>
        </motion.div>
 
        {/* Subtle semi-transparent overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#0A0A0B]/75 z-0 pointer-events-none"></div>
 
        {/* Subtle Luxury Ambient Background lines or glow */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[140px] pointer-events-none"
        ></motion.div>
 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-left max-w-4xl mr-auto">
            
            {/* Elegant luxury floating badge */}
            <motion.div 
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING_PREMIUM}
              className="inline-flex items-center gap-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 rounded-full px-4 py-1.5 mb-8 shadow-inner"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em]">
                ARQUITETURA DE ALTA CONVERSÃO B2B
              </span>
            </motion.div>
 
            {/* Main Editorial Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: EASE_PREMIUM, duration: 0.9, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight leading-[1.12] mb-6"
            >
              <span className="text-[#C5A059]">Escale</span> sua conversão e recupere leads no{' '}
              <span className="text-[#C5A059] italic font-normal">
                Piloto Automático.
              </span>
            </motion.h1>
 
            {/* Sub-headline focused on pain */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: EASE_PREMIUM, duration: 0.9, delay: 0.25 }}
              className="text-[#E4E4E7] text-base sm:text-lg md:text-xl font-normal [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)] mb-12 max-w-3xl leading-relaxed"
            >
              Diga adeus ao vazamento de recursos. Construímos <strong className="text-[#C5A059] font-semibold">Funcionários IA 24/7</strong> que qualificam e agendam reuniões comerciais em <strong className="text-white font-semibold">3 segundos</strong>, integrando <strong className="text-white font-semibold">sites de elite</strong> e campanhas corporativas focadas em <strong className="text-[#C5A059] font-semibold">ROI</strong>.
            </motion.p>
 
            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: EASE_PREMIUM, duration: 0.9, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 max-w-md sm:max-w-none"
            >
              <motion.a 
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                transition={SPRING_TACTILE}
                href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20diagn%C3%B3stico%20de%20automa%C3%A7%C3%A3o%20gratuito!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#D4AF37] text-black rounded-full px-8 py-4.5 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer"
                id="hero-primary-cta"
              >
                <span>Falar com especialista</span>
                <motion.span 
                  variants={{ hover: { x: 4 }, initial: { x: 0 } }}
                  transition={SPRING_TACTILE}
                  className="flex items-center"
                >
                  <ArrowRight className="h-4 w-4 text-black" />
                </motion.span>
              </motion.a>
 
              <motion.button 
                whileHover={{ scale: 1.02, borderColor: 'rgba(197, 160, 89, 0.4)', backgroundColor: '#121215' }}
                whileTap={{ scale: 0.96 }}
                transition={SPRING_TACTILE}
                onClick={() => scrollTo('simulator')}
                className="w-full sm:w-auto bg-[#0F0F12] text-[#E5E5E5] border border-[#1A1A1C] rounded-full px-8 py-4.5 font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer"
                id="hero-secondary-cta"
              >
                <span>Testar Simulador de CRM</span>
              </motion.button>
            </motion.div>

            {/* Trust Banner */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20 pt-12 border-t border-[#1A1A1C] flex flex-wrap justify-start items-center gap-x-6 sm:gap-x-12 gap-y-4 sm:gap-y-6 text-[#D4D4D8] hover:text-white transition-colors duration-300 font-mono text-[10px] tracking-[0.25em]"
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

          {/* PAS - Dores Columns in Stagger Cascade */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            
            {/* Problema 1: Contatos Esfriando */}
            <motion.div 
              variants={staggerItemReveal}
              whileHover={{ y: -8, borderColor: 'rgba(197, 160, 89, 0.4)', boxShadow: '0 20px 30px rgba(197, 160, 89, 0.05)' }}
              transition={SPRING_TACTILE}
              className="bg-[#121215] border border-[#1A1A1C] p-8 transition-colors flex flex-col justify-between rounded-xl"
            >
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
            </motion.div>
 
            {/* Problema 2: Site sem Credibilidade */}
            <motion.div 
              variants={staggerItemReveal}
              whileHover={{ y: -8, borderColor: 'rgba(197, 160, 89, 0.4)', boxShadow: '0 20px 30px rgba(197, 160, 89, 0.05)' }}
              transition={SPRING_TACTILE}
              className="bg-[#121215] border border-[#1A1A1C] p-8 transition-colors flex flex-col justify-between rounded-xl"
            >
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
            </motion.div>
 
            {/* Problema 3: Orçamento de Tráfego Queimado */}
            <motion.div 
              variants={staggerItemReveal}
              whileHover={{ y: -8, borderColor: 'rgba(197, 160, 89, 0.4)', boxShadow: '0 20px 30px rgba(197, 160, 89, 0.05)' }}
              transition={SPRING_TACTILE}
              className="bg-[#121215] border border-[#1A1A1C] p-8 transition-colors flex flex-col justify-between rounded-xl"
            >
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
            </motion.div>
 
          </motion.div>
 
          {/* LF7 Solution Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            whileHover={{ scale: 1.005, borderColor: 'rgba(197, 160, 89, 0.2)' }}
            className="mt-16 bg-[#121215] border border-[#1A1A1C] p-8 sm:p-12 relative overflow-hidden rounded-xl"
          >
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
                  Não criamos apenas sites ou anúncios soltos. Implementamos um <strong className="text-white font-semibold">Ecossistema Completo de Vendas Automatizadas</strong>. Construímos campanhas de anúncios persuasivas que atraem clientes com alta intenção de compra, encaminhamos para sites de elite ultrarrápidos e qualificais cada contato instantaneamente com Inteligência Artificial, agendando reuniões diretamente na sua agenda comercial.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(197, 160, 89, 0.3)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING_TACTILE}
                  onClick={() => scrollTo('simulator')}
                  className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs py-4 px-8 w-full lg:w-fit cursor-pointer"
                >
                  Ver LF7 na Prática &rarr;
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Nossos Serviços */}
      <section id="servicos" className="py-24 bg-gradient-to-b from-[#0A0A0B] via-[#121215] to-[#0A0A0B] border-b border-[#1A1A1C] relative overflow-hidden">
        {/* Subtle, Static, Premium Grid Background with Soft Ambient Gold Glows */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Premium Subtle Grid Pattern */}
              <pattern id="premiumGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.08" />
              </pattern>
            </defs>
            {/* Fill the pattern */}
            <rect width="100%" height="100%" fill="url(#premiumGrid)" />
            
            {/* Elegant static diagonal laser lines without blur filters or animations */}
            <g stroke="#C5A059" strokeWidth="0.75" strokeOpacity="0.12">
              <line x1="0" y1="10%" x2="100%" y2="10%" />
              <line x1="0" y1="50%" x2="100%" y2="50%" />
              <line x1="0" y1="90%" x2="100%" y2="90%" />
            </g>
            
            {/* Soft, beautiful vector glow highlights (Static & Lightweight) */}
            <circle cx="20%" cy="30%" r="200" fill="#C5A059" fillOpacity="0.03" />
            <circle cx="80%" cy="70%" r="220" fill="#E5C384" fillOpacity="0.02" />
          </svg>
          
          {/* Hardware-accelerated CSS gold radial gradients for luxury depth */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(229,195,132,0.04)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-[40%] left-[45%] w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_60%)] pointer-events-none" />
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

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            
            {/* Pilar 1: WhatsApp IA */}
            <motion.div 
              variants={staggerItemReveal}
              whileHover={{ y: -8, borderColor: 'rgba(197, 160, 89, 0.4)', boxShadow: '0 20px 30px rgba(197, 160, 89, 0.05)' }}
              transition={SPRING_TACTILE}
              className="bg-[#0F0F12] border border-[#1A1A1C] p-8 flex flex-col justify-between transition-colors rounded-xl"
            >
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
            </motion.div>
 
            {/* Pilar 2: Criação de Sites */}
            <motion.div 
              variants={staggerItemReveal}
              whileHover={{ y: -8, borderColor: 'rgba(197, 160, 89, 0.4)', boxShadow: '0 20px 30px rgba(197, 160, 89, 0.05)' }}
              transition={SPRING_TACTILE}
              className="bg-[#0F0F12] border border-[#1A1A1C] p-8 flex flex-col justify-between transition-colors rounded-xl"
            >
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
            </motion.div>
 
            {/* Pilar 3: Gestão de Tráfego */}
            <motion.div 
              variants={staggerItemReveal}
              whileHover={{ y: -8, borderColor: 'rgba(197, 160, 89, 0.4)', boxShadow: '0 20px 30px rgba(197, 160, 89, 0.05)' }}
              transition={SPRING_TACTILE}
              className="bg-[#0F0F12] border border-[#1A1A1C] p-8 flex flex-col justify-between transition-colors rounded-xl"
            >
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
            </motion.div>
 
          </motion.div>
        </div>
      </section>

      {/* Seção Temática de Criação de Sites de Elite */}
      <section id="criacao-sites" className="py-24 bg-gradient-to-b from-[#0A0A0B] via-[#121215] to-[#0A0A0B] border-b border-[#1A1A1C] relative overflow-hidden">
        {/* Premium background glows */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.05)_0%,transparent_60%)]" />
          <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(229,195,132,0.03)_0%,transparent_60%)]" />
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Text details / Attributes */}
            <motion.div variants={staggerItemReveal} className="lg:col-span-5 text-left">
              <span className="text-[#C5A059] font-mono text-xs uppercase tracking-[0.25em] mb-4 block">
                Engenharia Web de Alta Conversão
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight leading-tight mb-6">
                Desenvolvemos <span className="text-[#C5A059] italic font-normal">Sites de Elite</span> que vendem 24h por dia.
              </h2>
              <p className="text-[#A1A1AA] text-sm sm:text-base font-light leading-relaxed mb-8">
                Seu site não deve ser apenas um cartão de visitas digital. Desenvolvemos ecossistemas web sob medida com tecnologias de ponta como Next.js, React e Tailwind CSS, otimizados para velocidade extrema, conversão imediata de leads e SEO de alta performance.
              </p>
 
              {/* Feature list */}
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ x: 6 }} 
                  transition={SPRING_TACTILE}
                  className="flex gap-4 cursor-default"
                >
                  <div className="h-10 w-10 shrink-0 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                    <Gauge className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Velocidade Crítica (PageSpeed 95+)</h4>
                    <p className="text-[#A1A1AA] text-xs leading-relaxed">
                      Código otimizado e imagens compactadas para carregamento em menos de 1 segundo. Cada milissegundo a menos aumenta sua conversão.
                    </p>
                  </div>
                </motion.div>
 
                <motion.div 
                  whileHover={{ x: 6 }} 
                  transition={SPRING_TACTILE}
                  className="flex gap-4 cursor-default"
                >
                  <div className="h-10 w-10 shrink-0 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Design Ultra Responsivo & Premium</h4>
                    <p className="text-[#A1A1AA] text-xs leading-relaxed">
                      Experiência de navegação impecável em qualquer dispositivo, transmitindo o prestígio e a credibilidade que seu negócio merece.
                    </p>
                  </div>
                </motion.div>
 
                <motion.div 
                  whileHover={{ x: 6 }} 
                  transition={SPRING_TACTILE}
                  className="flex gap-4 cursor-default"
                >
                  <div className="h-10 w-10 shrink-0 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">SEO & Tráfego Orgânico Nativo</h4>
                    <p className="text-[#A1A1AA] text-xs leading-relaxed">
                      Estruturação de tags, schemas e metadados para que seu site seja encontrado facilmente pelos mecanismos de busca como o Google.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
 
            {/* Interactive Speed & Bounce Simulator */}
            <motion.div 
              variants={staggerItemReveal}
              whileHover={{ borderColor: 'rgba(197, 160, 89, 0.25)', boxShadow: '0 15px 30px rgba(197, 160, 89, 0.02)' }}
              transition={SPRING_PREMIUM}
              className="lg:col-span-7 bg-[#121215] border border-[#1A1A1C] p-6 sm:p-8 relative rounded-xl overflow-hidden"
            >
              <div className="absolute top-px left-px right-px h-[3px] bg-gradient-to-r from-[#886221] via-[#C5A059] to-[#E5C384] rounded-t-[11px]"></div>
              
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-serif text-white flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-[#C5A059]" />
                    Simulador de Impacto de Velocidade
                  </h3>
                  <p className="text-[10px] text-[#71717A] font-mono mt-1 uppercase tracking-wider">Mapeamento de Rejeição & Tráfego Perdido</p>
                </div>
                {speedAnalyzed && (
                  <motion.button 
                    whileHover={{ scale: 1.05, borderColor: 'rgba(197, 160, 89, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setSpeedAnalyzed(false); }}
                    className="text-[#A1A1AA] hover:text-[#C5A059] flex items-center gap-1.5 text-[9px] font-bold py-1.5 px-4 border border-[#1A1A1C] rounded-full transition-colors uppercase tracking-wider font-mono bg-[#0F0F12] cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" /> Reiniciar
                  </motion.button>
                )}
              </div>
 
              {!speedAnalyzed && !isAnalyzingSpeed && (
                <div className="space-y-6">
                  <div className="bg-[#0F0F12] p-4 border border-[#1A1A1C] text-xs text-[#A1A1AA] leading-relaxed flex gap-3">
                    <Sparkles className="h-5 w-5 text-[#C5A059] shrink-0" />
                    <span>A lentidão de um site é o maior ladrão de clientes invisível do mercado digital. Ajuste os sliders de investimento abaixo e simule o impacto real de velocidade no seu faturamento.</span>
                  </div>
 
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-[10px] font-mono mb-2">
                        <span className="text-[#A1A1AA] uppercase tracking-wider font-bold">Investimento Mensal em Tráfego (Anúncios)</span>
                        <span className="text-[#C5A059] font-extrabold">R$ {siteAdSpend.toLocaleString('pt-BR')}</span>
                      </div>
                      <input 
                        type="range" 
                        min="1000" 
                        max="50000" 
                        step="1000"
                        value={siteAdSpend} 
                        onChange={(e) => setSiteAdSpend(Number(e.target.value))}
                        className="w-full h-1 bg-[#0F0F12] rounded-none appearance-none cursor-pointer accent-[#C5A059]"
                      />
                    </div>
 
                    <div>
                      <div className="flex justify-between text-[10px] font-mono mb-2">
                        <span className="text-[#A1A1AA] uppercase tracking-wider font-bold">Valor Estimado do Cliente / Venda</span>
                        <span className="text-[#C5A059] font-extrabold">R$ {siteLeadValue.toLocaleString('pt-BR')}</span>
                      </div>
                      <input 
                        type="range" 
                        min="500" 
                        max="10000" 
                        step="500"
                        value={siteLeadValue} 
                        onChange={(e) => setSiteLeadValue(Number(e.target.value))}
                        className="w-full h-1 bg-[#0F0F12] rounded-none appearance-none cursor-pointer accent-[#C5A059]"
                      />
                    </div>
                  </div>
 
                  <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(197, 160, 89, 0.3)' }}
                    whileTap={{ scale: 0.96 }}
                    transition={SPRING_TACTILE}
                    onClick={() => {
                      setIsAnalyzingSpeed(true);
                      setTimeout(() => {
                        setIsAnalyzingSpeed(false);
                        setSpeedAnalyzed(true);
                      }, 1500);
                    }}
                    className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold py-4 rounded-full text-center flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-widest cursor-pointer"
                  >
                    <Play className="h-4 w-4 fill-black text-black" /> Simular Impacto de Velocidade
                  </motion.button>
                </div>
              )}
 
              {isAnalyzingSpeed && (
                <div className="py-16 text-center space-y-4">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-[#C5A059]/20 border-t-[#C5A059] animate-spin"></div>
                  </div>
                  <p className="text-xs font-mono text-[#C5A059] animate-pulse uppercase tracking-widest">
                    Analisando largura de banda e tempos de resposta do servidor...
                  </p>
                </div>
              )}
 
              {speedAnalyzed && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Site Tradicional card */}
                    <div className="bg-[#0F0F12] border border-red-500/20 p-4 relative rounded-xl flex flex-col justify-between">
                      <div className="absolute top-0 right-0 bg-red-950/40 border border-red-500/30 text-red-400 text-[8px] font-mono px-2 py-0.5 uppercase tracking-wider font-bold">
                        Comum Lento
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Site Tradicional Lento</h4>
                        
                        {/* PageSpeed Ring */}
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div 
                            initial={{ scale: 0.6, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={SPRING_PREMIUM}
                            className="h-10 w-10 rounded-full border-2 border-red-500/30 border-t-red-500 flex items-center justify-center text-xs font-mono font-bold text-red-500"
                          >
                            38%
                          </motion.div>
                          <div>
                            <div className="text-[10px] text-[#71717A] font-mono uppercase">Carregamento</div>
                            <div className="text-sm font-bold text-red-500">5.4 segundos</div>
                          </div>
                        </div>
 
                        <ul className="space-y-2 text-[11px] text-[#A1A1AA] mb-4">
                          <li className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            Taxa de Rejeição: <strong className="text-white font-semibold">68%</strong>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            Cliques Perdidos: <strong className="text-white font-semibold">{Math.round((siteAdSpend / 3) * 0.68)} / mês</strong>
                          </li>
                        </ul>
                      </div>
 
                      <div className="border-t border-[#1A1A1C] pt-3 mt-3">
                        <div className="text-[9px] text-[#71717A] font-mono uppercase mb-0.5">Verba Jogada no Lixo:</div>
                        <div className="text-base font-bold text-red-400">R$ {Math.round(siteAdSpend * 0.68).toLocaleString('pt-BR')}</div>
                      </div>
                    </div>
 
                    {/* Site LF7 de Elite card */}
                    <div className="bg-[#0F0F12] border border-[#C5A059]/30 p-4 relative rounded-xl flex flex-col justify-between">
                      <div className="absolute top-0 right-0 bg-[#C5A059]/10 text-[#C5A059] text-[8px] font-mono px-2 py-0.5 uppercase tracking-wider font-bold border border-[#C5A059]/30">
                        LF7 Web Engine
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Site LF7 de Elite</h4>
                        
                        {/* PageSpeed Ring */}
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div 
                            initial={{ scale: 0.6, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={SPRING_PREMIUM}
                            className="h-10 w-10 rounded-full border-2 border-[#C5A059]/20 border-t-[#C5A059] flex items-center justify-center text-xs font-mono font-bold text-[#C5A059]"
                          >
                            98%
                          </motion.div>
                          <div>
                            <div className="text-[10px] text-[#71717A] font-mono uppercase">Carregamento</div>
                            <div className="text-sm font-bold text-[#C5A059]">0.7 segundos</div>
                          </div>
                        </div>
 
                        <ul className="space-y-2 text-[11px] text-[#A1A1AA] mb-4">
                          <li className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                            Taxa de Rejeição: <strong className="text-[#C5A059] font-semibold">3%</strong>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                            Cliques Aproveitados: <strong className="text-white font-semibold">97%</strong>
                          </li>
                        </ul>
                      </div>
 
                      <div className="border-t border-[#1A1A1C] pt-3 mt-3">
                        <div className="text-[9px] text-[#71717A] font-mono uppercase mb-0.5">Recuperação de Mídia:</div>
                        <div className="text-base font-bold text-[#C5A059]">R$ {Math.round(siteAdSpend * 0.65).toLocaleString('pt-BR')}</div>
                      </div>
                    </div>
 
                  </div>
 
                  {/* Total impact assessment */}
                  <div className="bg-gradient-to-r from-[#0F0F12] to-[#C5A059]/10 p-5 border border-[#C5A059]/20 rounded-xl">
                    <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#C5A059] font-bold">
                      Faturamento Adicional Estimado / Mês
                    </div>
                    <div className="text-xl sm:text-2xl font-serif text-white mt-1.5">
                      + R$ {Math.round(((siteAdSpend / 3) * (0.65) * 0.04) * siteLeadValue).toLocaleString('pt-BR')} / Mês
                    </div>
                    <p className="text-[11px] text-[#A1A1AA] mt-2 leading-relaxed">
                      Ao reduzir o tempo de carregamento para menos de 1s, você estanca o desperdício de anúncios. Considerando cliques adicionais retidos e taxa média de conversão final de 4%, você recupera cerca de <strong className="text-white font-bold">{Math.round((siteAdSpend / 3) * 0.65 * 0.04)} vendas por mês</strong>.
                    </p>
                  </div>
                  
              <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(197, 160, 89, 0.3)' }}
                    whileTap={{ scale: 0.96 }}
                    transition={SPRING_TACTILE}
                    onClick={() => scrollTo('form-leads')}
                    className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold py-4 rounded-full text-center flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-widest cursor-pointer"
                  >
                    Construir Meu Site De Elite Agora &rarr;
                  </motion.button>
                </div>
              )}
 
            </motion.div>
          </div>
 
          {/* Showcase de Mockups Web de Elite */}
          <div className="mt-20 pt-16 border-t border-[#1A1A1C]">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-xl sm:text-2xl font-serif font-light text-white tracking-tight">
                Galeria de Conceitos: <span className="text-[#C5A059] italic font-normal">Arquiteturas de Conversão</span>
              </h3>
              <p className="text-[#A1A1AA] text-xs sm:text-sm font-light mt-2">
                Veja o nível de acabamento estético e design que construímos para cada segmento.
              </p>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: '1000px' }}>
              {/* Mockup 1: Don Giovanni */}
              <motion.div 
                whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5, scale: 1.01, borderColor: 'rgba(197, 160, 89, 0.4)', boxShadow: '0 25px 40px rgba(197, 160, 89, 0.06)' }}
                transition={SPRING_TACTILE}
                style={{ transformStyle: 'preserve-3d' }}
                className="bg-[#121215] border border-[#1A1A1C] rounded-xl overflow-hidden flex flex-col group text-left"
              >
                <div className="bg-[#0F0F12] px-4 py-2.5 border-b border-[#1A1A1C] flex items-center gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <div className="bg-[#1D1D21] text-[#71717A] text-[9px] font-mono px-3 py-0.5 rounded-none ml-3 w-40 truncate">dongiovanni.netlify.app</div>
                </div>
                <a 
                  href="https://dongiovanni.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex flex-col justify-between hover:no-underline"
                >
                  {/* Screenshot Wrapper */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#0A0A0B] border-b border-[#1A1A1C] shrink-0">
                    <img 
                      src="/mockup-dongiovanni.png" 
                      alt="Don Giovanni Mockup" 
                      className="w-full h-auto object-cover object-top transition-transform duration-[3000ms] ease-in-out transform group-hover:-translate-y-[20%] scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>
                  {/* Card Details */}
                  <div className="p-6 bg-gradient-to-b from-black to-[#0A0A0B] flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] font-mono text-[#C5A059] uppercase tracking-wider block mb-1">Gastronomia & Experiência Premium</span>
                      <h4 className="text-sm font-serif font-bold text-white tracking-tight mb-2 leading-tight">Don Giovanni • Alta Gastronomia</h4>
                      <p className="text-[10px] text-[#71717A] leading-relaxed mb-4">
                        Design sofisticado com reservas online intuitivas e apelo visual refinado para gastronomia e hotelaria.
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#1A1A1C] pt-3">
                      <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-950/40 px-2 py-0.5 border border-emerald-500/20">Foco: Reservas</span>
                      <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-wider group-hover:text-[#E5C384] transition-colors flex items-center gap-1">Ver Demo &rarr;</span>
                    </div>
                  </div>
                </a>
              </motion.div>

              {/* Mockup 2: Clínica Beatriz Galvão */}
              <motion.div 
                whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5, scale: 1.01, borderColor: 'rgba(197, 160, 89, 0.4)', boxShadow: '0 25px 40px rgba(197, 160, 89, 0.06)' }}
                transition={SPRING_TACTILE}
                style={{ transformStyle: 'preserve-3d' }}
                className="bg-[#121215] border border-[#1A1A1C] rounded-xl overflow-hidden flex flex-col group text-left"
              >
                <div className="bg-[#0F0F12] px-4 py-2.5 border-b border-[#1A1A1C] flex items-center gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <div className="bg-[#1D1D21] text-[#71717A] text-[9px] font-mono px-3 py-0.5 rounded-none ml-3 w-45 truncate">clinica-beatriz-galvao.vercel.app</div>
                </div>
                <a 
                  href="https://clinica-beatriz-galvao.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex flex-col justify-between hover:no-underline"
                >
                  {/* Screenshot Wrapper */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#0A0A0B] border-b border-[#1A1A1C] shrink-0">
                    <img 
                      src="/mockup-beatriz.png" 
                      alt="Clínica Beatriz Galvão Mockup" 
                      className="w-full h-auto object-cover object-top transition-transform duration-[3000ms] ease-in-out transform group-hover:-translate-y-[20%] scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>
                  {/* Card Details */}
                  <div className="p-6 bg-gradient-to-b from-black to-[#0A0A0B] flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] font-mono text-[#C5A059] uppercase tracking-wider block mb-1">Saúde & Estética Avançada</span>
                      <h4 className="text-sm font-serif font-bold text-white tracking-tight mb-2 leading-tight">Clínica Beatriz Galvão • Estética</h4>
                      <p className="text-[10px] text-[#71717A] leading-relaxed mb-4">
                        Estética de elite com design suave, catálogo elegante de serviços corporais e agendamento de consultas.
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#1A1A1C] pt-3">
                      <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-950/40 px-2 py-0.5 border border-emerald-500/20">Foco: Agendamento</span>
                      <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-wider group-hover:text-[#E5C384] transition-colors flex items-center gap-1">Ver Demo &rarr;</span>
                    </div>
                  </div>
                </a>
              </motion.div>

              {/* Mockup 3: Sr. Urso */}
              <motion.div 
                whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5, scale: 1.01, borderColor: 'rgba(197, 160, 89, 0.4)', boxShadow: '0 25px 40px rgba(197, 160, 89, 0.06)' }}
                transition={SPRING_TACTILE}
                style={{ transformStyle: 'preserve-3d' }}
                className="bg-[#121215] border border-[#1A1A1C] rounded-xl overflow-hidden flex flex-col group text-left"
              >
                <div className="bg-[#0F0F12] px-4 py-2.5 border-b border-[#1A1A1C] flex items-center gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <div className="bg-[#1D1D21] text-[#71717A] text-[9px] font-mono px-3 py-0.5 rounded-none ml-3 w-40 truncate">sr-urso.vercel.app</div>
                </div>
                <a 
                  href="https://sr-urso.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex flex-col justify-between hover:no-underline"
                >
                  {/* Screenshot Wrapper */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#0A0A0B] border-b border-[#1A1A1C] shrink-0">
                    <img 
                      src="/mockup-urso.png" 
                      alt="Sr. Urso Mockup" 
                      className="w-full h-auto object-cover object-top transition-transform duration-[3000ms] ease-in-out transform group-hover:-translate-y-[20%] scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>
                  {/* Card Details */}
                  <div className="p-6 bg-gradient-to-b from-black to-[#0A0A0B] flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] font-mono text-[#C5A059] uppercase tracking-wider block mb-1">Beleza & Estilo de Vida</span>
                      <h4 className="text-sm font-serif font-bold text-white tracking-tight mb-2 leading-tight">Sr. Urso Barbearia • Club Masculino</h4>
                      <p className="text-[10px] text-[#71717A] leading-relaxed mb-4">
                        Experiência digital forte e moderna, com marcação de horários integrada e catálogo de produtos.
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#1A1A1C] pt-3">
                      <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-950/40 px-2 py-0.5 border border-emerald-500/20">Foco: Captar & Agendar</span>
                      <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-wider group-hover:text-[#E5C384] transition-colors flex items-center gap-1">Ver Demo &rarr;</span>
                    </div>
                  </div>
                </a>
              </motion.div>

              {/* Mockup 4: Desentupidora J. Souza */}
              <motion.div 
                whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5, scale: 1.01, borderColor: 'rgba(197, 160, 89, 0.4)', boxShadow: '0 25px 40px rgba(197, 160, 89, 0.06)' }}
                transition={SPRING_TACTILE}
                style={{ transformStyle: 'preserve-3d' }}
                className="bg-[#121215] border border-[#1A1A1C] rounded-xl overflow-hidden flex flex-col group text-left"
              >
                <div className="bg-[#0F0F12] px-4 py-2.5 border-b border-[#1A1A1C] flex items-center gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <div className="bg-[#1D1D21] text-[#71717A] text-[9px] font-mono px-3 py-0.5 rounded-none ml-3 w-40 truncate">desentupidora-jsouza.vercel.app</div>
                </div>
                <a 
                  href="https://desentupidora-jsouza.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex flex-col justify-between hover:no-underline"
                >
                  {/* Screenshot Wrapper */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#0A0A0B] border-b border-[#1A1A1C] shrink-0">
                    <img 
                      src="/mockup-jsouza.png" 
                      alt="Desentupidora J. Souza Mockup" 
                      className="w-full h-auto object-cover object-top transition-transform duration-[3000ms] ease-in-out transform group-hover:-translate-y-[20%] scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>
                  {/* Card Details */}
                  <div className="p-6 bg-gradient-to-b from-black to-[#0A0A0B] flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] font-mono text-[#C5A059] uppercase tracking-wider block mb-1">Serviços Locais & Emergências</span>
                      <h4 className="text-sm font-serif font-bold text-white tracking-tight mb-2 leading-tight">Desentupidora J. Souza • 24h</h4>
                      <p className="text-[10px] text-[#71717A] leading-relaxed mb-4">
                        Landing page de conversão acelerada com agendamento imediato de serviços de desentupimento por WhatsApp.
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#1A1A1C] pt-3">
                      <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-950/40 px-2 py-0.5 border border-emerald-500/20">Foco: Leads WhatsApp</span>
                      <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-wider group-hover:text-[#E5C384] transition-colors flex items-center gap-1">Ver Demo &rarr;</span>
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
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
            <div className="flex justify-center w-full">
              <div className="bg-[#121215] p-1.5 rounded-3xl sm:rounded-full border border-[#1A1A1C] flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: '0 0 10px rgba(197, 160, 89, 0.2)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollTo('simulator')}
                  className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-2xl sm:rounded-full px-4 sm:px-6 py-3.5 sm:py-3 flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto text-center"
                  id="tab-btn-sim"
                >
                  <Bot className="h-3.5 w-3.5" /> 1. Simulador de CRM Inteligente
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.03, color: '#ffffff' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollTo('roi-calculator')}
                  className="hover:text-white text-[#A1A1AA] font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-2xl sm:rounded-full px-4 sm:px-6 py-3.5 sm:py-3 flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto text-center"
                  id="tab-btn-roi"
                >
                  <DollarSign className="h-3.5 w-3.5 text-[#C5A059]" /> 2. Calculadora de ROI
                </motion.button>
              </div>
            </div>

            {/* Main Interactive Grid (Forms & Results side by side) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Simulated Live CRM UI (Português de Brasil) */}
              <motion.div 
                id="simulator" 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 bg-[#121215] border border-[#1A1A1C] rounded-xl p-6 sm:p-8 relative"
              >
                
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
                    <motion.button 
                      whileHover={{ scale: 1.05, color: '#C5A059' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetSimulator}
                      className="text-[#A1A1AA] flex items-center gap-1.5 text-[10px] font-bold py-1.5 px-4 border border-[#1A1A1C] hover:border-[#C5A059]/40 rounded-full transition-colors uppercase tracking-wider font-mono bg-[#0F0F12] cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" /> Reiniciar
                    </motion.button>
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
                        className="w-full bg-[#0F0F12] border border-[#1A1A1C] focus:border-[#C5A059] rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]/50 transition-all"
                      />
                    </div>
 
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Segmento Operacional</label>
                        <select 
                          value={simulatorSegment} 
                          onChange={(e) => setSimulatorSegment(e.target.value)}
                          className="w-full bg-[#0F0F12] border border-[#1A1A1C] focus:border-[#C5A059] rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none transition-all cursor-pointer"
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
                          className="w-full bg-[#0F0F12] border border-[#1A1A1C] focus:border-[#C5A059] rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>
 
                    <motion.button 
                      whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(197, 160, 89, 0.3)' }}
                      whileTap={{ scale: 0.96 }}
                      transition={SPRING_TACTILE}
                      type="submit"
                      className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold py-4 rounded-full text-center flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-widest cursor-pointer"
                      id="submit-simular"
                    >
                      <Play className="h-4 w-4 fill-black text-black" /> Construir Estratégia de IA
                    </motion.button>
                  </form>
                )}
 
                {simulationStep >= 1 && (
                  <div className="space-y-6">
                    {/* Kanban Simulator */}
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Status do Lead no CRM da LF7:</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[9px] sm:text-xs">
                        
                        <div className={`p-2.5 rounded-xl border transition-all ${crmColumn === 'captured' ? 'bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059] font-bold shadow-sm' : 'bg-[#0F0F12] border-[#1A1A1C] text-[#71717A]'}`}>
                          <div className="truncate font-mono font-bold">1. CAPTURADO</div>
                          {crmColumn === 'captured' && (
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={SPRING_TACTILE}
                              className="mt-1 text-[8px] sm:text-[9px] bg-[#C5A059] text-black font-sans py-0.5 px-1.5 rounded-none inline-block"
                            >
                              Formulário Entrou
                            </motion.div>
                          )}
                        </div>
 
                        <div className={`p-2.5 rounded-xl border transition-all ${crmColumn === 'qualifying' ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#C5A059] font-bold shadow-sm' : 'bg-[#0F0F12] border-[#1A1A1C] text-[#71717A]'}`}>
                          <div className="truncate font-mono font-bold">2. TRIAREM IA</div>
                          {crmColumn === 'qualifying' && (
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={SPRING_TACTILE}
                              className="mt-1 text-[8px] sm:text-[9px] bg-[#C5A059] text-black font-sans py-0.5 px-1.5 rounded-none inline-block animate-pulse"
                            >
                              Avaliando Perfil
                            </motion.div>
                          )}
                        </div>
 
                        <div className={`p-2.5 rounded-xl border transition-all ${crmColumn === 'hot' ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059] font-bold shadow-sm' : 'bg-[#0F0F12] border-[#1A1A1C] text-[#71717A]'}`}>
                          <div className="truncate font-mono font-bold">3. QUALIFICADO</div>
                          {crmColumn === 'hot' && (
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={SPRING_TACTILE}
                              className="mt-1 text-[8px] sm:text-[9px] bg-[#C5A059] text-black font-sans py-0.5 px-1.5 rounded-none inline-block animate-pulse font-mono"
                            >
                              Agente Pronto
                            </motion.div>
                          )}
                        </div>
 
                        <div className={`p-2.5 rounded-xl border transition-all ${crmColumn === 'scheduled' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold shadow-sm' : 'bg-[#0F0F12] border-[#1A1A1C] text-[#71717A]'}`}>
                          <div className="truncate font-mono font-bold">4. AGENDADO</div>
                          {crmColumn === 'scheduled' && (
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={SPRING_TACTILE}
                              className="mt-1 text-[8px] sm:text-[9px] bg-emerald-500 text-black font-sans py-0.5 px-1.5 rounded-none inline-block uppercase tracking-wider"
                            >
                              Confirmado 📅
                            </motion.div>
                          )}
                        </div>
 
                      </div>
                    </div>
 
                    {/* Active Card details inside CRM */}
                    <div className="bg-[#0F0F12] p-4 border border-[#1A1A1C] rounded-xl">
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
                    <div className="border border-[#1A1A1C] rounded-xl bg-[#0F0F12] overflow-hidden">
                      <div className="bg-[#121215] border-b border-[#1A1A1C] px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span className="text-xs font-bold text-white">Abordagem do Robô Inteligente (Simulação)</span>
                        </div>
                        <span className="text-[10px] text-[#71717A] font-mono uppercase">WhatsApp Cloud API</span>
                      </div>
 
                      <div className="p-4 h-64 overflow-y-auto space-y-3 flex flex-col justify-end bg-[#0A0A0B]/60 shadow-inner">
                        {activeChatMessages.map((msg, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 15, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={SPRING_TACTILE}
                            className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                              msg.sender === 'ai' 
                                ? 'bg-[#C5A059]/15 text-[#E5E5E5] self-start border border-[#C5A059]/30 font-sans' 
                                : 'bg-[#1D1D21] border border-[#2E2E33] text-neutral-200 self-end'
                            }`}
                          >
                            {msg.text}
                          </motion.div>
                        ))}
 
                        {isTyping && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={SPRING_TACTILE}
                            className="bg-[#121215] text-[#C5A059] self-start text-[10px] px-3.5 py-1.5 border border-[#1A1A1C] rounded-xl flex items-center gap-2 font-mono uppercase tracking-wider"
                          >
                            <span className="inline-block animate-bounce font-extrabold">.</span>
                            <span className="inline-block animate-bounce delay-100 font-extrabold">.</span>
                            <span className="inline-block animate-bounce delay-200 font-extrabold">.</span>
                            <span>IA da LF7 está redigindo</span>
                          </motion.div>
                        )}
                        
                        <div ref={chatEndRef} />
                      </div>
                    </div>
 
                    {/* Complete simulated flow block */}
                    {simulationStep === 2 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#121215] border border-emerald-500/50 p-6 rounded-xl text-center"
                      >
                        <div className="h-10 w-10 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] mx-auto mb-3">
                          <Check className="h-5 w-5" />
                        </div>
                        <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-widest font-mono">Simulação de Sucesso!</h4>
                        <p className="text-[#A1A1AA] text-xs mt-2 max-w-lg mx-auto leading-relaxed">
                          O robô com inteligência artificial estabeleceu diálogo realista sobre <strong className="text-white font-medium">{simulatorChallenges}</strong>, demonstrou as possibilidades de venda aplicadas e cadastrou a oportunidade de reunião integrada sem intervenção humana de sua equipe.
                        </p>
                        <motion.button 
                          whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(197, 160, 89, 0.3)' }}
                          whileTap={{ scale: 0.96 }}
                          transition={SPRING_TACTILE}
                          onClick={() => scrollTo('form-leads')}
                          className="mt-5 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-full text-[10px] tracking-widest uppercase cursor-pointer"
                        >
                          Agendar Diagnóstico Gratuito 📲
                        </motion.button>
                      </motion.div>
                    )}

                  </div>
                )}
              </motion.div>

               {/* Simulated ROI Calculator inside B2B Portuguese */}
              <motion.div 
                id="roi-calculator" 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 bg-[#121215] border border-[#1A1A1C] rounded-xl p-6 sm:p-8"
              >
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
                      <motion.span 
                        key={lossRate}
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="text-[#C5A059] font-mono font-bold inline-block"
                      >
                        -{lossRate}% de taxa de conversão
                      </motion.span>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A1A1AA] font-bold font-mono uppercase tracking-wider">Prejuízo Financeiro Mês:</span>
                      <motion.span 
                        key={financialLoss}
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="text-red-400 font-mono font-bold inline-block"
                      >
                        R$ {financialLoss.toLocaleString('pt-BR')}
                      </motion.span>
                    </div>

                    {/* Recuperação com LF7 */}
                    <div className="bg-gradient-to-r from-[#0F0F12] to-[#C5A059]/10 p-5 border border-[#C5A059]/20 rounded-xl">
                      <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#C5A059] font-bold">Faturamento Recuperado • Estimado</div>
                      <div className="text-xl sm:text-2xl font-serif text-white mt-1.5 overflow-hidden">
                        <motion.span 
                          key={recoveredRevenue}
                          initial={{ scale: 0.95, opacity: 0.8 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          className="inline-block"
                        >
                          + R$ {recoveredRevenue.toLocaleString('pt-BR')} / Mês
                        </motion.span>
                      </div>
                      <p className="text-[11px] text-[#A1A1AA] mt-2 leading-relaxed">
                        Reduzindo o atendimento para 3 segundos com robôs IA, estimamos a recuperação média de{' '}
                        <motion.strong 
                          key={recoveredLeads}
                          initial={{ scale: 0.95, opacity: 0.8 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          className="text-white font-bold inline-block"
                        >
                          {recoveredLeads} vendas mensais
                        </motion.strong>{' '}
                        anteriormente perdidas no limbo.
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>

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
            
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121215] p-8 border border-[#1A1A1C] rounded-xl hover:border-[#C5A059]/30 transition-all duration-300"
            >
              <span className="text-3xl text-[#C5A059] block mb-5">👁️</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Visão 360 do Funil</h4>
              <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed">
                Analisamos e integramos desde a segmentação de anúncios até o carregamento do site de alta performance, roteiro de WhatsApp e agendamento CRM de vendas estruturado.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121215] p-8 border border-[#1A1A1C] rounded-xl hover:border-[#C5A059]/30 transition-all duration-300"
            >
              <span className="text-3xl text-[#C5A059] block mb-5">🤖</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Higienização Inteligente</h4>
              <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed">
                Oferecemos conexões nativas com CRM líderes de mercado do Brasil (RD Station, ActiveCampaign, HubSpot). Seus dados entram qualificados, pré-triados e estruturados.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121215] p-8 border border-[#1A1A1C] rounded-xl hover:border-[#C5A059]/30 transition-all duration-300"
            >
              <span className="text-3xl text-[#C5A059] block mb-5">⚡</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Velocidade Crítica</h4>
              <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed">
                Nossos códigos minimizam o tempo de download eliminando sobrecargas. Menor lentidão significa melhor custo de conversão por anúncio digital nas plataformas.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121215] p-8 border border-[#1A1A1C] rounded-xl hover:border-[#C5A059]/30 transition-all duration-300"
            >
              <span className="text-3xl text-[#C5A059] block mb-5">📈</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Tom de Voz Corporativo</h4>
              <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed">
                Desenhamos robôs customizados que usam linguagem refinada, empática e estritamente educada. Adequamos os prompts de acordo com o padrão do seu público alvo.
              </p>
            </motion.div>

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
              <motion.button 
                whileHover={{ scale: 1.08, borderColor: 'rgba(197, 160, 89, 0.5)', color: '#E5C384' }}
                whileTap={{ scale: 0.92 }}
                transition={SPRING_TACTILE}
                onClick={() => {
                  setAutoplayTestimonials(false);
                  setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                }}
                className="w-12 h-12 border border-[#1A1A1C] bg-[#121215]/80 text-[#71717A] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#121215]"
                aria-label="Depoimento Anterior"
                id="btn-prev-testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.08, borderColor: 'rgba(197, 160, 89, 0.5)', color: '#E5C384' }}
                whileTap={{ scale: 0.92 }}
                transition={SPRING_TACTILE}
                onClick={() => {
                  setAutoplayTestimonials(false);
                  setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
                }}
                className="w-12 h-12 border border-[#1A1A1C] bg-[#121215]/80 text-[#71717A] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#121215]"
                aria-label="Próximo Depoimento"
                id="btn-next-testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Testimonial Active Slider Card */}
          <div className="relative">
            {/* Elegant visual badge */}
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-gradient-to-r from-[#886221] via-[#C5A059] to-[#E5C384] text-black text-[9px] font-mono font-bold uppercase tracking-widest px-4 py-1.5 shadow-lg z-20">
              Resultado LF7 Automações
            </div>

            <div 
              className="bg-[#121215] border border-[#1A1A1C] hover:border-[#C5A059]/20 transition-all duration-300 relative rounded-xl shadow-[20px_20px_0_rgba(10,10,11,0.5)] overflow-hidden"
              onMouseEnter={() => setAutoplayTestimonials(false)}
              onMouseLeave={() => setAutoplayTestimonials(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                  className="grid grid-cols-1 lg:grid-cols-12"
                >
                  
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

                      <p className="text-[#D1D1D6] font-serif font-light text-base sm:text-lg leading-relaxed italic">
                        &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                      </p>
                    </div>

                    <div className="relative z-10 mt-10 pt-8 border-t border-[#1A1A1C] flex flex-wrap items-center justify-between gap-4">
                      <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest">Estudo de Caso Auditado</span>
                      <motion.a 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={SPRING_TACTILE}
                        href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20vi%20o%20caso%20de%20sucesso%20no%20site%20e%20gostaria%20de%20resultados%20similares%20de%20automa%C3%A7%C3%A3o%20e%20CRM!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C5A059] hover:text-[#E5C384] text-xs font-bold uppercase tracking-widest flex items-center gap-2 group cursor-pointer"
                        id={`testimonial-cta-${testimonials[currentTestimonial].id}`}
                      >
                        <span>Quero estes resultados</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </motion.a>
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel Dot Indicators */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                layout
                onClick={() => {
                  setAutoplayTestimonials(false);
                  setCurrentTestimonial(idx);
                }}
                className={`h-2.5 rounded-full cursor-pointer transition-colors duration-300 ${
                  currentTestimonial === idx 
                    ? 'w-8 bg-gradient-to-r from-[#C5A059] to-[#E5C384]' 
                    : 'w-2.5 bg-[#1A1A1C] hover:bg-[#71717A]/40'
                }`}
                transition={SPRING_PREMIUM}
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
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: EASE_PREMIUM }}
                whileHover={{ borderColor: 'rgba(197, 160, 89, 0.3)' }}
                className="bg-[#121215] border border-[#1A1A1C] rounded-xl overflow-hidden transition-colors duration-300"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 sm:px-8 text-left flex items-center justify-between text-white font-semibold hover:text-[#C5A059] transition-colors gap-4 cursor-pointer"
                  id={`faq-btn-${idx}`}
                >
                  <span className="text-sm sm:text-base font-serif text-left leading-relaxed">{item.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={SPRING_PREMIUM}
                    className="shrink-0 text-[#C5A059]"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        height: { type: 'spring', stiffness: 280, damping: 28 },
                        opacity: { duration: 0.2, ease: 'easeInOut' }
                      }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-6 text-[#A1A1AA] text-xs sm:text-sm leading-relaxed border-t border-[#1A1A1C] pt-4 font-sans">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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

          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0F0F12] border border-[#1A1A1C] p-8 sm:p-12 rounded-xl max-w-2xl mx-auto text-center relative overflow-hidden"
          >
            {/* Elegant top line gold accent */}
            <div className="absolute top-px left-px right-px h-[3px] bg-gradient-to-r from-[#886221] via-[#C5A059] to-[#E5C384] rounded-t-[11px]"></div>

            <div className="mb-6">
              <span className="text-4xl">📊</span>
              <h3 className="text-lg font-serif text-white mt-4 font-bold">Diagnóstico Comercial Personalizado</h3>
              <p className="text-[11px] text-[#A1A1AA] mt-2 leading-relaxed font-mono uppercase tracking-wider">
                Vagas limitadas para este semestre devido à nossa alta demanda
              </p>
            </div>

            <div className="space-y-4">
              <motion.a 
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                transition={SPRING_TACTILE}
                href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20meu%20diagn%C3%B3stico%20de%20automa%C3%A7%C3%A3o%20e%20CRM%20gratuito!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-black font-extrabold py-5 rounded-full text-center flex items-center justify-center gap-3 tracking-widest text-xs uppercase cursor-pointer"
                id="footer-card-cta"
              >
                <motion.span
                  variants={{
                    hover: { rotate: [0, -10, 10, -10, 10, 0] }
                  }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center shrink-0"
                >
                  <MessageSquare className="h-4 w-4 fill-black text-black" />
                </motion.span>
                <span>Agendar Via WhatsApp</span>
              </motion.a>

              <p className="text-[9px] text-[#71717A] font-mono uppercase tracking-wider">
                Sem compromisso • Diagnóstico conduzido diretamente em 15 minutos na nossa sala virtual
              </p>
            </div>
          </motion.div>

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
        <motion.a
          whileHover={{ scale: 1.1, boxShadow: '0 0 35px rgba(37,211,102,0.7)' }}
          whileTap={{ scale: 0.92 }}
          transition={SPRING_TACTILE}
          href="https://wa.me/5521981062423?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20diagn%C3%B3stico%20de%20automa%C3%A7%C3%A3o%20e%20falar%20com%20um%20especialista!"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full border border-[#25D366]/60 cursor-pointer"
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
        </motion.a>
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
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#121215] to-[#0A0A0B] border border-[#C5A059]/30 rounded-xl shadow-[0_0_50px_rgba(197,160,89,0.2)] flex flex-col focus:outline-none"
              id="privacy-modal-body"
            >
              {/* Header Gold Gradient Decor */}
              <div className="h-[4px] w-full bg-gradient-to-r from-[#886221] via-[#C5A059] to-[#E5C384] rounded-t-xl" />
              
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
                    className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-extrabold uppercase tracking-widest text-[10px] py-4 px-8 rounded-full transition-all duration-300 cursor-pointer hover:scale-[1.02]"
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
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#121215] to-[#0A0A0B] border border-[#C5A059]/30 rounded-xl shadow-[0_0_50px_rgba(197,160,89,0.2)] flex flex-col focus:outline-none"
              id="terms-modal-body"
            >
              {/* Header Gold Gradient Decor */}
              <div className="h-[4px] w-full bg-gradient-to-r from-[#886221] via-[#C5A059] to-[#E5C384] rounded-t-xl" />
              
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
                    className="bg-[#C5A059] hover:bg-[#D4AF37] text-black font-extrabold uppercase tracking-widest text-[10px] py-4 px-8 rounded-full transition-all duration-300 cursor-pointer hover:scale-[1.02]"
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
