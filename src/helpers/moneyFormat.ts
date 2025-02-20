export const MoneyFormat = (val:number) => {
    return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(val);
}
 