import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrganizationStore {
  organizationId: number | null;
  organizationName: string | null;
  organizationLogo: string | null;
  themeColor: string | null;

  setOrganizationId: (id: number | null) => void;
  setOrganizationName: (name: string | null) => void;
  setOrganizationLogo: (logo: string | null) => void;
  setThemeColor: (themeColor: string | null) => void;
}

const useOrganizationStore = create(
  persist<OrganizationStore>(
    (set) => ({
      organizationId: null,
      organizationName: null,
      organizationLogo: null,
      themeColor: null,

      setOrganizationId: (id: number | null) => set({ organizationId: id }),
      setOrganizationName: (name: string | null) =>
        set({ organizationName: name }),
      setOrganizationLogo: (logo: string | null) =>
        set({ organizationLogo: logo }),
      setThemeColor: (themeColor: string | null) => set({ themeColor }),
    }),
    {
      name: "organizaiton-store",
    }
  )
);

export default useOrganizationStore;
