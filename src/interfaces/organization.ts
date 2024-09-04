export interface CreateOrgProps {
  moveStep: (path: -1 | 1) => void;
  data: PostOrganizationAPIParams;
  preview: string;
  setData: React.Dispatch<React.SetStateAction<PostOrganizationAPIParams>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
}

export interface ManageOrgProps {
  moveStep?: (path: -1 | 1) => void;
  disabled?: boolean;
  data: string[];
  setData?:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((value: string[]) => void);
  handleCreate?: () => void;
}

// ========== API Interface ==========
export interface PostOrganizationAPIParams {
  name: string;
  themeColor: string;
  positions: string[];
}

export interface PostOrganizationAPI {
  organizationId: number;
  organizationName: string;
  organizationLogo?: string;
  themeColor: string;
}

export interface PatchOrganizationInfoAPIParams {
  name: string;
  themeColor: string;
  logo: string | null;
}
