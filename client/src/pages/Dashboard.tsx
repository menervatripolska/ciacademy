import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  AdvancedModulesSection,
  ArchitectureLayersSection,
  BtcStructureSection,
  CryptoMapSection,
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
      <CryptoMapSection />
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
