import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Dynamic initialization helper to prevent startup crashes when GEMINI_API_KEY is not configured yet.
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Fallback dynamic responses for key industries in Brazil in Portuguese if Gemini isn't configured
const fallbacks: Record<string, {
  customAutomationScript: string;
  painAnalysis: string;
  suggestedCampaigns: string;
  whatsappSimulatorDialogue: Array<{ sender: "client" | "ai"; text: string }>;
}> = {
  default: {
    customAutomationScript: "[Olá! Como posso ajudar?] -> [Qualificação Automatizada] -> [Agendamento de Diagnóstico]",
    painAnalysis: "Quase 80% dos contatos desistem quando esperam mais de 10 minutos. O primeiro a responder leva a venda.",
    suggestedCampaigns: "Meta Ads direcionando para conversas com nossa IA e qualificação em tempo real.",
    whatsappSimulatorDialogue: [
      { sender: "client", text: "Olá! Gostaria de saber mais sobre os serviços de vocês." },
      { sender: "ai", text: "Olá! Que ótimo ter você por aqui. Sou o Assistente IA da LF7. Qual é o seu nome e como posso te ajudar hoje?" },
      { sender: "client", text: "Me chamo Marcos. Quero automatizar o atendimento da minha distribuidora." },
      { sender: "ai", text: "Prazer, Marcos! Distribuidoras têm pico de pedidos e perdem muito tempo com dúvidas simples. Nossa IA pode consultar estoque e fechar orçamentos. Quantos leads você recebe por dia?" },
      { sender: "client", text: "Recebemos uns 40 contatos por dia, mas nossa equipe comercial demora pra responder." },
      { sender: "ai", text: "Compreendo. 40 leads ao dia representam mais de 1.000 chances de vendas mensais. Com nossa IA respondendo em 3 segundos, você pode recuperar até 60% das vendas perdidas. Vamos agendar uma consultoria detalhada?" },
      { sender: "client", text: "Sim, por favor! Quinta-feira à tarde seria bom." },
      { sender: "ai", text: "Perfeito, Marcos! Já agendei seu horário na quinta-feira às 15h. Um de nossos especialistas entrará em contato. Até logo!" }
    ]
  },
  imobiliaria: {
    customAutomationScript: "IA Imobiliária LF7: Triagem de orçamento, localização de interesse e agendamento de visita com corretor humano já qualificado.",
    painAnalysis: "Leads de imobiliárias buscam rapidez extrema. Se o corretor demora para responder, ele avança para o imóvel do concorrente.",
    suggestedCampaigns: "Meta Ads focado em carrossel de imóveis + Lead no WhatsApp integrado com CRM local.",
    whatsappSimulatorDialogue: [
      { sender: "client", text: "Olá! Vi o anúncio do apartamento de 3 quartos no Centro." },
      { sender: "ai", text: "Olá! Sou a Júlia, Assistente Virtual de Vendas. Qual o seu nome? Vou te passar todas as informações sobre esse apartamento incrível." },
      { sender: "client", text: "Me chamo Fernanda. Queria saber se aceita financiamento." },
      { sender: "ai", text: "Prazer, Fernanda! Sim, esse imóvel aceita financiamento direto ou bancário. Você já tem uma simulação de crédito aprovada ou gostaria que nosso time de corretores avaliasse para você?" },
      { sender: "client", text: "Ainda não tenho. Queria agendar uma visita para sábado de manhã." },
      { sender: "ai", text: "Ótimo! Temos vagas às 9h ou 11h no sábado. Qual horário prefere? Já vou deixar nosso corretor de plantão avisado e ele te ligará amanhã." },
      { sender: "client", text: "Pode ser às 10h30 se possível, senão 11h" },
      { sender: "ai", text: "Confirmado sábado às 11h, Fernanda! Um corretor especialista irá te acompanhar. Tenha um excelente dia!" }
    ]
  },
  estetica: {
    customAutomationScript: "IA Clínica Estética: Apresentação de tratamentos, contraindicações básicas, envio de fotos de antes e depois autorizadas, e fechamento de horário direto na agenda.",
    painAnalysis: "Atendimento comercial de clínicas de estética costuma congestionar em horários de pico comercial, perdendo agendamentos imediatos.",
    suggestedCampaigns: "Tráfego pago local (Instagram) mostrando transformações (Antes/Depois) e link direto para agendamento instantâneo no WhatsApp.",
    whatsappSimulatorDialogue: [
      { sender: "client", text: "Olá! Quanto custa a sessão de depilação a laser?" },
      { sender: "ai", text: "Olá, bem-vinda à nossa clínica estética! Meu nome é Sofia. Para qual região do corpo você gostaria da depilação a laser hoje?" },
      { sender: "client", text: "Queria saber para perna inteira." },
      { sender: "ai", text: "Perfeito! A sessão de perna inteira está com uma promoção especial de R$ 149,90 este mês. Quantas sessões você já realizou ou seria a sua primeira vez com laser?" },
      { sender: "client", text: "Seria minha primeira vez. Quero ver se tem vaga para essa semana ainda ou próxima." },
      { sender: "ai", text: "Que legal! Na primeira sessão fazemos uma avaliação gratuita da sua pele. Temos vagas nesta quarta-feira às 14h ou sexta-feira às 10h. Qual fica melhor para você?" },
      { sender: "client", text: "Quarta às 14h fica ótimo!" },
      { sender: "ai", text: "Reservado com sucesso! Quarta às 14h na nossa unidade principal. Te enviaremos as orientações de preparo em breve. Até breve!" }
    ]
  },
  saas: {
    customAutomationScript: "IA SaaS LF7: Qualificação técnica de leads (tamanho de empresa, orçamento, decisor direto) e direcionamento automático para reunião com o SDR ou Account Executive.",
    painAnalysis: "Leads de tecnologia exigem respostas rápidas e estruturadas. Se o tempo de resposta passar de 5 minutos, ele desiste da POC.",
    suggestedCampaigns: "Google Search Ads capturando termos de intenção de compra + LinkedIn Ads com formulário de lead automatizado para WhatsApp.",
    whatsappSimulatorDialogue: [
      { sender: "client", text: "Quero conhecer o plano corporativo do sistema de vocês." },
      { sender: "ai", text: "Olá! Sou o Consultor IA da LF7 Tech. Com certeza! Para eu te passar o escopo do plano corporativo, quantas licenças ou usuários ativos você estima na sua empresa?" },
      { sender: "client", text: "Somos em 35 pessoas no escritório." },
      { sender: "ai", text: "Entendido! Com 35 usuários, o plano corporativo oferece faturamento simplificado, integrações via API e suporte dedicado com SLA de 2 horas. Qual ferramenta vocês usam hoje para essa gestão?" },
      { sender: "client", text: "Usamos planilhas e o Trello, mas está muito desorganizado." },
      { sender: "ai", text: "Com certeza, planilhas geram gargalos à medida que o time cresce. Nosso sistema economiza cerca de 14 horas de trabalho por semana para times do seu tamanho. Gostaria de uma demonstração guiada por vídeo amanhã às 14h?" },
      { sender: "client", text: "Amanhã às 14h está agendado!" },
      { sender: "ai", text: "Combinado! Link enviado. Nosso consultor técnico estará te esperando. Um abraço!" }
    ]
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, segment, currentChallenges } = body;

    const selectedSegment = segment ? String(segment).toLowerCase() : "default";
    const segmentKey = fallbacks[selectedSegment] ? selectedSegment : "default";
    const fallbackData = fallbacks[segmentKey];

    const ai = getGeminiClient();

    if (!ai) {
      // Return beautiful structured fallback if no GEMINI_API_KEY is defined yet
      return NextResponse.json({
        success: true,
        customAutomationScript: fallbackData.customAutomationScript,
        painAnalysis: fallbackData.painAnalysis,
        suggestedCampaigns: fallbackData.suggestedCampaigns,
        whatsappSimulatorDialogue: fallbackData.whatsappSimulatorDialogue,
        isDemoMode: true
      });
    }

    const segmentsPT: Record<string, string> = {
      imobiliaria: "Imobiliária / Corretores",
      estetica: "Clínicas de Estética / Saúde",
      saas: "Empresas de Tecnologia / SaaS",
      ecommerce: "E-commerce / Lojas Virtuais",
      default: "Prestadores de Serviços B2B",
      advocacia: "Escritórios de Advocacia / Consultorias"
    };

    const friendlySegment = segmentsPT[selectedSegment] || segment;

    const prompt = `Você é o Copywriter Sênior e Arquiteto de Vendas Inteligentes da agência "LF7 Marketing Digital e Automações".
Um potencial cliente preencheu um formulário de diagnóstico rápido no nosso site com as seguintes informações:
- Nome da Empresa: "${companyName || 'Empresa Teste'}"
- Segmento de Negócios: "${friendlySegment}"
- Principais Desafios de Vendas: "${currentChallenges || 'Atendimento lento e falta de tráfego qualificado'}"

Precisamos gerar uma estratégia profissional em português do Brasil no sentido de encantá-lo com nosso conhecimento técnico em IA, Sites rápidos e Anúncios robustos.

Gere uma resposta estritamente estruturada em JSON contendo exatamente as seguintes propriedades:
1. "customAutomationScript": Texto conciso resumindo o roteiro de abordagem que a IA no WhatsApp faria específica para a empresa dele para capturar e qualificar o Lead.
2. "painAnalysis": Uma análise copywriting sênior curta e direta (máximo 4 linhas) mostrando onde a empresa dele está perdendo dinheiro hoje no processo comercial.
3. "suggestedCampaigns": Uma recomendação de campanha de tráfego pago (Meta Ads ou Google Ads) específica para o mercado dele para alimentar essa automação.
4. "whatsappSimulatorDialogue": Um array contendo exatamente entre 6 e 8 mensagens simulando uma conversa realística no WhatsApp de qualificação. Cada mensagem do array deve ter o formato:
   { "sender": "client" | "ai", "text": "Mensagem escrita de forma muito natural em PT-BR" }
   O diálogo deve ser super natural de WhatsApp (com gírias de negócios leves, ágil, sem enrolação, usando o nome da empresa e o segmento) simulando um lead real conversando com um funcionário IA da "LF7" focado em qualificar o Lead e marcar horário.

Gere apenas o objeto JSON correspondente a esse formato em strings simples.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["customAutomationScript", "painAnalysis", "suggestedCampaigns", "whatsappSimulatorDialogue"],
          properties: {
            customAutomationScript: { type: Type.STRING },
            painAnalysis: { type: Type.STRING },
            suggestedCampaigns: { type: Type.STRING },
            whatsappSimulatorDialogue: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["sender", "text"],
                properties: {
                  sender: { type: Type.STRING, enum: ["client", "ai"] },
                  text: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const responseText = response.text || "";
    const parsedData = JSON.parse(responseText.trim());

    return NextResponse.json({
      success: true,
      customAutomationScript: parsedData.customAutomationScript || fallbackData.customAutomationScript,
      painAnalysis: parsedData.painAnalysis || fallbackData.painAnalysis,
      suggestedCampaigns: parsedData.suggestedCampaigns || fallbackData.suggestedCampaigns,
      whatsappSimulatorDialogue: parsedData.whatsappSimulatorDialogue || fallbackData.whatsappSimulatorDialogue,
      isDemoMode: false
    });

  } catch (error: any) {
    console.error("Erro consultando o Gemini API:", error);
    // Secure recovery that always outputs valid Brazilian Portuguese content to make the experience smooth
    return NextResponse.json({
      success: true,
      customAutomationScript: "Iniciando atendimento inteligente focado no nicho do cliente, identificando necessidades e agendando demonstração em 3 cliques.",
      painAnalysis: "O atual fluxo comercial possui gargalos críticos no tempo de resposta inicial, o que desencadeia uma perda contínua de leads premium para competidores ágeis.",
      suggestedCampaigns: "Estratégia híbrida: Tráfego local via Instagram Stories redirecionando a audiência para fluxo conversacional gamificado e otimização diária de lances.",
      whatsappSimulatorDialogue: [
        { sender: "client", text: "Olá! Gostaria de entender mais como funciona o sistema de vocês." },
        { sender: "ai", text: "Olá! Seja muito bem-vindo. Sou a IA de Vendas da LF7. Qual é o seu nome e qual empresa você representa?" },
        { sender: "client", text: "Me chamo Roberto e tenho uma clínica odontológica." },
        { sender: "ai", text: "Prazer, Roberto! Clínicas odontológicas precisam de agendamento ultra-rápido de consultas. Nossa IA pode fazer pré-agendamentos na hora e disparar lembretes. Quantos pacientes novos vocês gostariam de atender este mês?" },
        { sender: "client", text: "Pelo menos uns 30 novos pacientes premium." },
        { sender: "ai", text: "Excelente meta! Com anúncios no Google Maps atraindo quem busca 'dentista' na sua região combinados com nossa IA respondendo em segundos, conseguimos bater essa meta facilmente. Vamos agendar sua demonstração?" },
        { sender: "client", text: "Com certeza, amanhã de manhã ficaria perfeito." },
        { sender: "ai", text: "Agendado! Reservado na agenda para Roberto, amanhã às 10h. Um abraço e até lá!" }
      ],
      isDemoMode: true,
      errorInfo: error.message
    });
  }
}
