import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  AdvancedModulesSection,
  AiGuideSection,
  ArchitectureLayersSection,
  BtcStructureSection,
  CryptoMapSection,
  CoinOfTheWeekSection,
  CryptoMultiplierSection,
  DcaSection,
  ExecutionModulesSection,
  GridSection,
  HeroOverviewSection,
  LiveStrategiesSection,
  MacroRegimeSection,
  SemiCoreSection,
  WatchlistSection,
} from "@/components/dashboard/DashboardSections";

export default function Dashboard() {
  return (
    <DashboardShell>
      <HeroOverviewSection />
      <MacroRegimeSection />
      <CryptoMultiplierSection />
      <BtcStructureSection />
      <CryptoMapSection />
      <WatchlistSection />
      <CoinOfTheWeekSection />
      <LiveStrategiesSection />
      <DcaSection />
      <GridSection />
      <AiGuideSection />
      <SemiCoreSection />
      <AdvancedModulesSection />
      <ArchitectureLayersSection />
      <ExecutionModulesSection />
    </DashboardShell>
  );
}
