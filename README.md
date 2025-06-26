// Archivo: App.jsx
// Proyecto: TALENTIQ - HRIS con IA
// Descripción: Interfaz visual del sistema de recursos humanos con IA

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart2, Users, Brain, Search, ShieldCheck } from "lucide-react";

export default function App() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">TALENTIQ - HRIS Potenciado por IA</h1>

      <Tabs defaultValue="cv-parsing">
        <TabsList className="grid grid-cols-5 gap-2 mb-4">
          <TabsTrigger value="cv-parsing"><Search className="inline w-4 h-4 mr-1" />CV Parsing</TabsTrigger>
          <TabsTrigger value="matching"><Users className="inline w-4 h-4 mr-1" />Matching</TabsTrigger>
          <TabsTrigger value="insights"><Brain className="inline w-4 h-4 mr-1" />Insights</TabsTrigger>
          <TabsTrigger value="dashboard"><BarChart2 className="inline w-4 h-4 mr-1" />Dashboard</TabsTrigger>
          <TabsTrigger value="compliance"><ShieldCheck className="inline w-4 h-4 mr-1" />Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="cv-parsing">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Análisis Inteligente de CV</h2>
              <p>
                Extrae y normaliza automáticamente datos clave usando PLN y modelos entrenados para inferir habilidades ocultas.
              </p>
              <Button className="mt-4">Subir Hoja de Vida</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matching">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Matching Inteligente</h2>
              <p>
                Conecta automáticamente vacantes con perfiles mediante IA, utilizando emparejamiento semántico y aprendizaje de casos previos.
              </p>
              <Button className="mt-4">Ver Coincidencias</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Detección de Talento y Potencial</h2>
              <p>
                Identifica fortalezas, debilidades, y potencial de desarrollo de los candidatos a través de análisis multimodal.
              </p>
              <Button className="mt-4">Analizar Perfil</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Indicadores Inteligentes</h2>
              <p>
                Explora insights generados por IA en tiempo real sobre desempeño, rotación, equidad salarial y más.
              </p>
              <Button className="mt-4">Ver Dashboard</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Cumplimiento Legal con IA</h2>
              <p>
                Monitoriza sesgos y riesgos legales automáticamente. Auditoría algorítmica continua y alertas preventivas.
              </p>
              <Button className="mt-4">Revisar Auditorías</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
