// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

//Factory Function to make new DNA
const pAequorFactory = (num, dna) => {
  return {
    specimenNum: num,
    dna: dna,
    mutate () {
      const random_index = Math.floor(Math.random() * this.dna.length)
      let new_base = returnRandBase()
      while (this.dna[random_index] === new_base){
        new_base = returnRandBase()
      }
      this.dna[random_index] = new_base
      return this.dna
    },
    compareDNA(second_dna){
      const similarity = this.dna.reduce((accumulator, current, i, arr) => {
        if (arr[i] === second_dna.dna[i]){
          return accumulator + 1
        } else {
          return accumulator
        }
      }, 0)
      let percDNAsame = (similarity / this.dna.length) * 100
      percDNAsame = percDNAsame.toFixed(2)
      console.log(percDNAsame + '%')
    },
    willLikelySurvive(){
      const CandG = this.dna.filter(base => base === 'C' || base === 'G')
      return CandG.length / this.dna.length >= 0.6
    }
  }
}

//Creates 30 new specimen DNA that will likely survive and stores them in DNAs array
DNAs = []
idCounter = 1
while (DNAs.length < 30){
  let newDNA = pAequorFactory(idCounter, mockUpStrand())
  if ( newDNA.willLikelySurvive()){
    DNAs.push(newDNA)
  }
  idCounter++
}








