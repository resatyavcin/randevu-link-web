import { CalendarClock, Link2, Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-linear-to-b from-muted/40 via-background to-background dark:from-muted/15" />
        <div className="absolute -top-28 right-[-12%] size-88 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-400/12" />
        <div className="absolute top-1/3 left-[-18%] size-72 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-500/10" />
        <div className="absolute bottom-[-15%] right-[20%] size-72 rounded-full bg-indigo-300/10 blur-3xl dark:bg-cyan-500/8" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="mx-auto w-full max-w-xl md:max-w-2xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <span
              className={cn(
                "mb-5 inline-flex size-16 items-center justify-center rounded-2xl",
                "bg-linear-to-br from-primary/15 to-indigo-500/10 text-primary shadow-md ring-1 ring-primary/15",
                "dark:from-indigo-500/20 dark:to-violet-600/15 dark:text-indigo-200 dark:ring-indigo-400/20",
              )}
            >
              <CalendarClock className="size-8" strokeWidth={1.6} />
            </span>

            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur-sm dark:bg-background/50">
              <Sparkles className="size-3.5 text-indigo-500 dark:text-indigo-400" />
              Müşteriler için hızlı randevu
            </p>

            <h1 className="text-balance text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Randevu{" "}
              <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                Link
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              İşletmenizin paylaştığı özel adresten online randevu oluşturun. Ek
              uygulama gerekmez; tarayıcıdan birkaç adımda tamamlanır.
            </p>
          </div>

          <Card className="w-full border-border/50 bg-card/85 text-left shadow-lg shadow-black/4 ring-1 ring-border/40 backdrop-blur-md dark:bg-card/70 dark:shadow-black/25">
            <CardHeader className="space-y-2 pb-4">
              <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
                <span className="flex size-9 items-center justify-center rounded-lg bg-indigo-500/10 dark:bg-indigo-400/15">
                  <Link2 className="size-4 shrink-0" aria-hidden />
                </span>
                <CardTitle className="text-lg font-semibold leading-snug md:text-xl">
                  Randevu adresi nasıl görünür?
                </CardTitle>
              </div>
              <CardDescription className="text-base leading-relaxed md:text-[0.95rem]">
                İşletmeniz size bir{" "}
                <strong className="font-semibold text-foreground">slug</strong>{" "}
                verir; siz de o slug ile şu yapıda bir sayfayı açarsınız:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="rounded-xl border border-border/70 bg-muted/35 px-4 py-3.5 font-mono text-sm text-foreground shadow-inner dark:border-border/50 dark:bg-muted/25">
                <span className="text-muted-foreground">…/r/</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  isletme-adi
                </span>
              </div>
              <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
                <li className="flex gap-3.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500/20 to-violet-500/15 text-xs font-bold text-indigo-700 ring-1 ring-indigo-500/20 dark:text-indigo-300 dark:ring-indigo-400/25">
                    1
                  </span>
                  <span className="pt-0.5">
                    İşletmenizden size özel randevu bağlantısını (veya slug’ı)
                    isteyin.
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500/20 to-violet-500/15 text-xs font-bold text-indigo-700 ring-1 ring-indigo-500/20 dark:text-indigo-300 dark:ring-indigo-400/25">
                    2
                  </span>
                  <span className="pt-0.5">
                    Linki tarayıcıda açın; çalışan, hizmet ve saat seçerek
                    randevuyu onaylayın.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground">
            Yanlış veya eski bir link kullanıyorsanız işletmenizle iletişime
            geçin.
          </p>
        </div>
      </div>
    </main>
  );
}
