import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  AdvancedModulesSection,
  ArchitectureLayersSection,
  BtcStructureSection,
  PortfolioCompositionSection,
  CoinOfTheWeekSection,
  CryptoMultiplierSection,
  DcaSection,
  ExecutionModulesSection,
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
      <PortfolioCompositionSection />
      <WatchlistSection />
      <CoinOfTheWeekSection />
      <DcaSection />
      <LiveStrategiesSection />
      <SemiCoreSection />
      <AdvancedModulesSection />
      <ArchitectureLayersSection />
      <ExecutionModulesSection />
    </DashboardShell>
  );
}
