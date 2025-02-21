"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { checkCPF, removeCpfPunctionation } from "../../menu/helpers/cpf";

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, { message: "O CPF é Obrigatório" })
    .refine((value) => checkCPF(value), {
      message: "CPF Inválido",
    }),
});

type FormSchema = z.infer<typeof formSchema>


const CPFForm = () => {
    const router = useRouter();
    const path = usePathname();
    const onSubmit = (data: FormSchema) => {
        router.push(`${path}?cpf=${removeCpfPunctionation(data.cpf)}`)
    }
    const handleCancel = () =>{router.back()}
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema)
    })
    return (
        <Drawer open>
        <DrawerContent>
            <DrawerHeader>
            <DrawerTitle>Verificar pedidos</DrawerTitle>
            <DrawerDescription>Insira seu CPF para verificar seus pedidos solicitados.</DrawerDescription>
            </DrawerHeader>
            <div className="px-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Button type="submit" variant={"destructive"} className="rounded-full">
                    Verificar
                    </Button>
                    <DrawerClose asChild>
                        <Button variant={"outline"} onClick={() => {handleCancel()}}>Cancelar</Button>
                    </DrawerClose>
                </DrawerFooter>
                </form>
            </Form>
            </div>
        </DrawerContent>
        </Drawer>
     );
}
 
export default CPFForm;

