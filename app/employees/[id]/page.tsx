import { EmployeeProfile } from "./EmployeeProfile";

type EmployeePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EmployeePage({ params }: EmployeePageProps) {
  const { id } = await params;

  return <EmployeeProfile employeeId={id} />;
}
