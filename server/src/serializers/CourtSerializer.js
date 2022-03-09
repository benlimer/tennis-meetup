class CourtSerializer {
    static async getSummary(courts){
      const allowedAttributes = ['photos','formatted_address', 'geometry', 'name', 'rating', 'user_ratings_total', 'opening_hours']
      const serializedCourts = courts.map((court) => {
        let serializedCourt = {}
        for (const attribute of allowedAttributes){
          serializedCourt[attribute] = court[attribute]
        }
        return serializedCourt
      })
  
      return serializedCourts
    }
  
  }
  
  export default CourtSerializer