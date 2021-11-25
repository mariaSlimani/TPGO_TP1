import React, {useEffect, useState} from 'react';
import './App.css';
import Add from './add.png';
import Weight from './weight.png';
<script type="text/javascript" src="./script.js"></script>
function App() {
  const [liste, setListe] = useState([
    {
      nom: "1er element",
      poids: 10,
      gain: 20
    }, {
      nom: "2eme element",
      poids: 20,
      gain: 20
    }
  ]);
  const [listeCar, setListeCar] = useState([]);
  const [poidsMax, setPoidsMax] = useState(0);
  const [gainMax, setGainMax] = useState(0);
  const [poidsMaxDef, setPoidsMaxDef] = useState(0);

  useEffect(() => {
    let k = [...liste];
    let reponse = maxGain(orderList(k), poidsMaxDef);
    setListeCar(reponse.theList);
    setGainMax(reponse.maxG);
    setPoidsMax(reponse.maxWeight);
  }, [liste, poidsMaxDef]);
  function tableEles(list) {
    return (<tbody>
      {
        list.map((ele) => {
          return (<tr>
            <td>{ele.nom}</td>
            <td>{ele.gain}</td>
            <td>{ele.poids}</td>
          </tr>)
        })
      }
    </tbody>);
  }
  function orderList(list) {
    return list.sort((a, b) => {
      if (a.gain < b.gain) {
        return 1;
      }
      if (a.gain > b.gain) {
        return -1;
      }
      return 0;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    return false;
  }
  function ajouter(event) {
    let pds = document.querySelector("#f_poids").value;
    let g = document.querySelector("#f_gain").value;
    if (pds === "" || g === "") {
      alert("Veuillez remplir tous les champs")
    } else {
      setListe(prevState => ([
        ...prevState, {
          nom: eleNum() + " élément",
          poids: parseInt(pds),
          gain: parseInt(g)
        }
      ]));
      document.querySelectorAll("form").forEach((ele) => ele.reset());
    }

  }
  function maxGain(list, weight) {
    let i = 0;
    let w = 0;
    let gain = 0;
    let maxList = [];
    while ((i < list.length) && (w <= weight)) {
      if ((list[i].poids <= (weight - w)) && (gain < (gain + list[i].gain))) {
        w = w + list[i].poids;
        gain = gain + list[i].gain;
        maxList.push(list[i]);
      }
      i++;
    }
    return {theList: maxList, maxWeight: w, maxG: gain};
  }
  function eleNum() {
    if (liste.length === 0) {
      return "1er";
    }
    return (liste.length + 1 + "ieme");
  }
  function def() {
    let pdsm = document.querySelector("#f_poidsMax").value;
    if (pdsm === "") {
      alert("Veuillez renseigner le poids maximal que le cartable peut contenir")
    } else {
      setPoidsMaxDef(pdsm);
      document.querySelectorAll("form").forEach((ele) => ele.reset());
    }
  }
  return(
      <div className="App" onClick={function(event) {
          if (event.target == document.getElementById("myModal"))
          {document.getElementById("myModal").style.display = "none"}
          else if (event.target == document.getElementById("myModal2"))
          {document.getElementById("myModal2").style.display = "none"}
        }}>

      <header>
    </header>
    <h1>Problème du sac à dos en nombres entiers</h1>
      <main>
        <nav>
          <button id="myBtn" onClick={function() {document.getElementById("myModal").style.display = "block"}} title="Ajouter un élément">
            <img src={Add} alt="Ajouter un élément" width="40px" height="40px"></img>
          </button>
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={function() {document.getElementById("myModal").style.display = "none"}}>&times;</span>
              <form method="POST" action="/" onSubmit={handleSubmit} noValidate="noValidate">
                <h3>Veuillez introduire les informations concernant le {eleNum()} élément</h3>
                <span>
                  <label htmlFor="weight">Le poids du {eleNum()} élément</label>
                  <input type="number" name="weight" placeholder="Le poids" id="f_poids" min="0"/>
                </span>
                <span>
                  <label htmlFor="gain">Le gain du {eleNum()} élément
                  </label>
                  <input type="number" name="gain" placeholder="Le gain" id="f_gain" min="0"/>
                </span>

                <input type="submit" name="submit" value="Ajouter" onClick={ajouter}/>
              </form>
            </div>
          </div>

          <button id="myBtn2" onClick={function() {document.getElementById("myModal2").style.display = "block"}} title="Redéfinir le poids maximal">
            <img src={Weight} alt="Redéfinir le poids maximal" width="40px" height="45px"></img>
          </button>
          <div id="myModal2" className="modal">
          <div className="modal-content s">
            <span className="close" onClick={function() {document.getElementById("myModal2").style.display = "none"}}>&times;</span>
            <form method="POST" action="/" onSubmit={handleSubmit} noValidate="noValidate">
              <span>
                <label htmlFor="maxW">Veuillez définir le poids maximal</label>
                <input type="number" name="maxW" placeholder="Le poids maximal" id="f_poidsMax" min="0"/>
              </span>
              <input type="submit" name="submit" value="Définir" onClick={def}/>
            </form>
          </div>
        </div>
        </nav>
        <section>
          <div>
            <h5>Le probléme est le suivant : nous avons un cartable pouvant contenir un poids maximal de {poidsMaxDef}kg et un nombre n={liste.length} éléments comme suit :
            </h5>
            <div className="tableContainer1">
              <table id="inputedTable">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Gain</th>
                    <th>Poids</th>
                  </tr>
                </thead>
                {tableEles(liste)}
              </table>
            </div>
          </div>

          <div>
            <h5>En applicant notre algorithme le cartable contiendera {listeCar.length} éléments comme suit :<br/><br/></h5>
            <div className="tableContainer2">
              <table id="cartable">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Gain</th>
                    <th>Poids</th>
                  </tr>
                </thead>
                {tableEles(listeCar)}
                <tfoot>
                  <tr>
                    <th>Poids total</th>
                    <td colSpan="2">{poidsMax}</td>
                  </tr>
                  <tr>
                    <th>Gain total</th>
                    <td colSpan="2">{gainMax}</td>
                  </tr>

                </tfoot>
              </table>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default App;
