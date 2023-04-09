export interface IUserView {
  id: string ;
  name: string | null;
  email: string | null;
  position:   string | null;
  grade: number | null;
  major: string | null;
  dc: string | null;
  role: string | null;
}

export interface IUserForm {
  name: string | null,
  grade: number | null,
  email: string | null,
  dc: string | null,
  position: string | null,
  major: string | null,
  role: string | null,
}
