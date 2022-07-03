import { useState } from "react";
import { controls } from "../../../constants/controls";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { useArena } from "./useArena";

const getDamage = (attacker, defender) => {
  // return damage
  let attack_power = getHitPower(attacker);
  let block_power = getBlockPower(defender);

  let damage = attack_power - block_power;

  if(damage < 0){
    damage = 0;
  }
  return damage;

};



const getHitPower = (fighter) => {
  // return hit power
  let criticalHitChance = 1 + Math.random() * 1;
  let power = fighter.attack * criticalHitChance;
  return power;
};

const getBlockPower = (fighter) => {
  // return block power
  let dodgeChance = 1 + Math.random() * 1;
  let power = fighter.defence * dodgeChance;
  return power;
};

let indicator = 0;

export const useFight = () => {

  indicator += 1;

  
  const { selectedPair } = useArena();
  const { keysPressed } = useKeyPress();
  const {
    playerOneAttack,
    playerOneBlock,
    playerTwoAttack,
    playerTwoBlock,
    playerOneCriticalHitCombination,
    playerTwoCriticalHitCombination,
  } = controls;


  let [fighterOneDetails,setfighterOneDetails] = useState({
    name : selectedPair.playerOne.name,
    health : selectedPair.playerOne.health,
    initialHealth : selectedPair.playerOne.health,
    source : selectedPair.playerOne.source,
    attack : selectedPair.playerOne.attack,
    defence : selectedPair.playerOne.defense
  })

  let [fighterTwoDetails,setfighterTwoDetails] = useState({
    name : selectedPair.playerTwo.name,
    health : selectedPair.playerTwo.health,
    initialHealth :selectedPair.playerTwo.health,
    source : selectedPair.playerTwo.source,
    attack : selectedPair.playerTwo.attack,
    defence : selectedPair.playerTwo.defense
  })

  if(indicator == 12){
      setfighterOneDetails({
        name : selectedPair.playerOne.name,
        health : selectedPair.playerOne.health,
        initialHealth : selectedPair.playerOne.health,
        source : selectedPair.playerOne.source,
        attack : selectedPair.playerOne.attack,
        defence : selectedPair.playerOne.defense
      })

      setfighterTwoDetails({
        name : selectedPair.playerTwo.name,
        health : selectedPair.playerTwo.health,
        initialHealth :selectedPair.playerTwo.health,
        source : selectedPair.playerTwo.source,
        attack : selectedPair.playerTwo.attack,
        defence : selectedPair.playerTwo.defense
      })
  }


 

  



  // implement fight logic, return fighters details and winner details

  window.addEventListener('keypress', e => {
    let key = '';
    let k = e.key;
    key = "Key"+k.toUpperCase();


  
    if(key == playerOneAttack){
      fighterTwoDetails.health -= getDamage(fighterOneDetails, fighterTwoDetails);
      console.log(getDamage(fighterOneDetails, fighterTwoDetails))
    }
    if(key == playerTwoAttack){
      fighterOneDetails.health -= getDamage(fighterTwoDetails, fighterOneDetails);
      console.log(getDamage(fighterOneDetails, fighterTwoDetails))
    }


  });


  //I'm new to React, please give me a chance to become a real React developer, I know this code is horrible...
  //I learn fast

  return {
    fighterOneDetails,
    fighterTwoDetails,
    //winner,
  };
};
