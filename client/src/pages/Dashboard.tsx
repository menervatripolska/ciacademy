import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  AdvancedModulesSection,
  AiGuideSection,
  ArchitectureLayersSection,
  BtcStructureSection,
  CryptoMapSection,
  CryptoMultiplierSection,
  DcaSection,
  ExecutionModulesSection,
  GridSection,
  HeroOverviewSection,
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
