import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { inputClass } from "@/app/r/[slug]/booking/shared";

type StepContactProps = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  campaignCode: string;
  notes: string;
  onCustomerNameChange: (v: string) => void;
  onCustomerPhoneChange: (v: string) => void;
  onCustomerEmailChange: (v: string) => void;
  onCampaignCodeChange: (v: string) => void;
  onNotesChange: (v: string) => void;
};

export function StepContact({
  customerName,
  customerPhone,
  customerEmail,
  campaignCode,
  notes,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onCustomerEmailChange,
  onCampaignCodeChange,
  onNotesChange,
}: StepContactProps) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="customerName" className="text-sm font-medium">
          Ad soyad
        </Label>
        <Input
          id="customerName"
          className={inputClass}
          value={customerName}
          onChange={(ev) => onCustomerNameChange(ev.target.value)}
          autoComplete="name"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="customerPhone" className="text-sm font-medium">
          Telefon
        </Label>
        <Input
          id="customerPhone"
          className={inputClass}
          value={customerPhone}
          onChange={(ev) => onCustomerPhoneChange(ev.target.value)}
          inputMode="tel"
          autoComplete="tel"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="customerEmail" className="text-sm font-medium">
          E-posta (isteğe bağlı)
        </Label>
        <Input
          id="customerEmail"
          type="email"
          className={inputClass}
          value={customerEmail}
          onChange={(ev) => onCustomerEmailChange(ev.target.value)}
          autoComplete="email"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="campaignCode" className="text-sm font-medium">
          Kampanya kodu (isteğe bağlı)
        </Label>
        <Input
          id="campaignCode"
          className={inputClass}
          value={campaignCode}
          onChange={(ev) => onCampaignCodeChange(ev.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes" className="text-sm font-medium">
          Notlar (isteğe bağlı)
        </Label>
        <Input
          id="notes"
          className={inputClass}
          value={notes}
          onChange={(ev) => onNotesChange(ev.target.value)}
        />
      </div>
    </div>
  );
}
