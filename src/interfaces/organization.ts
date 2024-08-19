export interface CreateOrg {
  moveStep: (path: -1 | 1) => void;
  data: PostOrganizationAPIParams;
  setData: React.Dispatch<React.SetStateAction<PostOrganizationAPIParams>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export interface ManageOrg {
  moveStep?: (path: -1 | 1) => void;
  disabled?: boolean;
  data: string[];
  setData?: React.Dispatch<React.SetStateAction<PostOrganizationAPIParams>>;
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
}
