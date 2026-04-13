import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  fieldClass,
  inputClass,
  normalizeTrPhoneNationalInput,
  TR_PHONE_PREFIX,
} from "@/app/r/[slug]/booking/shared";
import { cn } from "@/lib/utils";

type StepContactProps = {
  customerName: string;
  customerPhoneNational: string;
  customerEmail: string;
  notes: string;
  onCustomerNameChange: (v: string) => void;
  onCustomerPhoneNationalChange: (v: string) => void;
  onCustomerEmailChange: (v: string) => void;
  onNotesChange: (v: string) => void;
};

const prefixSelectClassName = cn(
  fieldClass,
  "w-[4.5rem] shrink-0 cursor-not-allowed bg-muted/40 text-muted-foreground",
);

export function StepContact({
  customerName,
  customerPhoneNational,
  customerEmail,
  notes,
  onCustomerNameChange,
  onCustomerPhoneNationalChange,
  onCustomerEmailChange,
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
        <span className="text-sm font-medium">Telefon</span>
        <div className="flex min-w-0 gap-2">
          <select
            aria-label="Ülke kodu"
            title="Ülke kodu"
            className={prefixSelectClassName}
            value={TR_PHONE_PREFIX}
            disabled
          >
            <option value={TR_PHONE_PREFIX}>{TR_PHONE_PREFIX}</option>
          </select>
          <Input
            id="customerPhoneNational"
            className={cn(inputClass, "min-w-0 flex-1 text-base md:text-sm")}
            value={customerPhoneNational}
            onChange={(ev) =>
              onCustomerPhoneNationalChange(
                normalizeTrPhoneNationalInput(ev.target.value),
              )
            }
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="5XX XXX XX XX"
            maxLength={10}
            required
            aria-label="Cep telefonu (10 hane)"
          />
        </div>
        <p className="text-muted-foreground text-xs">
          Numara +90 ile kaydedilir; ülke kodu değiştirilemez.
        </p>
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
