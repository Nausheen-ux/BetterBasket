


//  export function CalculateGreenPoints(cart, quizResponses)  {
//   const tagMap = {
//     1: "vegan",
//     2: "vegetarian",
//     3: "dairy_free",
//     4: "gluten_free",
//     5: "cruelty_free",
//     6: "recyclable_packaging",
//     7: "upcycled",
//     8: "local",
//     9: "new_brand",
//     10: "eco_friendly",
//   };

//   let points = 0;

//   cart.forEach((item) => {
//     Object.entries(quizResponses).forEach(([qId, answeredYes]) => {
//       const tag = tagMap[qId];
//       if (!tag || !answeredYes) return;

//       if (item.tags?.includes(tag)) {
//         points += 10;
//       }
//     });
//   });

//   // Save to localStorage
//   localStorage.setItem("greenPoints", JSON.stringify(points));

//   return points;
// }
