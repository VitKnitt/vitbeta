import fabrika from "../images/fabrika.jpg";

const Books = () => {
  return (
    <div className="books">
      <div className="book">
        <h1>Fabrika</h1>
        <h3>
          Kniha, která vznikla úplnou náhodou jakožto osobní boj proti
          lhostejnosti.
        </h3>
        <div className="descriptionbook">
          <img src={fabrika} alt="fabrika cover" />
          <article>
            <h3>Jak jít na záchod</h3>
            <p>
              Prostředí, ve kterém se pohybujeme vzniká na základě chování
              jedinců. Někdy je velkým dobrodružstvím jít třeba na záchod.
              Existují dva způsoby jak se posadit na čisté prkýnko, aniž by ho
              člověk musel obkládat toaleťákem. Je velice důležité nakoukat
              pracovní cyklus uklízeček. Vyžaduje to bystrost a dobré pozorovací
              schopnosti. Ne každá uklízečka používá různé hadry na různé úkony.
              Je třeba si vytipovat ty, které neutírají všechno stejným hadrem a
              vypozorovat jejich směny. Až naleznete svou uklízecí vílu je
              nezbytné odskočit si hned poté, co dokončí úklid na vašich
              oblíbených toaletách, protože za pár minut už nemusí být
              použitelné...
            </p>
            <div>autorské čtení již brzy</div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Books;
