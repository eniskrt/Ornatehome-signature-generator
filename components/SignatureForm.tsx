import type { Employee } from "@/lib/signature";

type Props = {
  employee: Employee;
  onChange: (employee: Employee) => void;
};

const fields: Array<{ key: keyof Employee; label: string; type: string; autoComplete: string; disabled?: boolean; placeholder?: string }> = [
  { key: "fullName", label: "Full Name", type: "text", autoComplete: "name" },
  { key: "jobTitle", label: "Job Title", type: "text", autoComplete: "organization-title" },
  { key: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { key: "linkedinUrl", label: "LinkedIn URL", type: "url", autoComplete: "url", placeholder: "https://www.linkedin.com/in/..." },
  { key: "address", label: "Address", type: "text", autoComplete: "street-address", disabled: true },
  { key: "website", label: "Website", type: "text", autoComplete: "url" },
];

export function SignatureForm({ employee, onChange }: Props) {
  return (
    <section className="panel form-panel" aria-labelledby="employee-heading">
      <div className="section-heading">
        <span className="eyebrow">Employee details</span>
        <h2 id="employee-heading">Information</h2>
        <p>Changes appear in the preview instantly.</p>
      </div>
      <form className="employee-form" onSubmit={(event) => event.preventDefault()}>
        {fields.map((field) => (
          <label key={field.key}>
            <span>{field.label}</span>
            <input
              type={field.type}
              value={employee[field.key]}
              autoComplete={field.autoComplete}
              disabled={field.disabled}
              placeholder={field.placeholder}
              onChange={(event) => onChange({ ...employee, [field.key]: event.target.value })}
            />
          </label>
        ))}
      </form>
    </section>
  );
}
