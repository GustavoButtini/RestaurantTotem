"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { checkCPF } from "../helpers/cpf";
const formSchema = z.object({
  nome: z.string().trim().min(1, {
    message: "O Nome é obrigatório",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, { message: "O CPF é Obrigatório" })
    .refine((value) => checkCPF(value), {
      message: "CPF Inválido",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogParams {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogParams) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cpf: "",
    },
    shouldUnregister: true,
  });
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Hello World</DrawerTitle>
          <DrawerDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet,
            voluptatum deserunt. Architecto officia eveniet numquam. Vero
            laboriosam amet magni nisi error, ea ut eveniet et debitis nihil
            tempora excepturi necessitatibus?
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {
                console.log("Enviado !");
              })}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Insira seu nome</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF"
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      ></PatternFormat>
                    </FormControl>
                    <FormDescription>Insira seu CPF</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <DrawerFooter>
                <Button type="submit" variant={"destructive"}>
                  Finalizar
                </Button>
                <DrawerClose asChild>
                  <Button variant={"outline"}>Cancelar</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
