let videoGameDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'

let videoGameData

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawTreeMap = () => {

    let hierarchy = d3.hierarchy(videoGameData, (node) => {
         return node['children']
    }).sum((node) => {
        return node['value']
    }).sort((node1, node2) => {
        return node2['value'] - node1['value']
    })

    let createTreeMap = d3.treemap()
                          .size([1000, 600])
    
    createTreeMap(hierarchy)                     

    let videoGameTiles = hierarchy.leaves()
    console.log(videoGameTiles)

   let block = canvas.selectAll('g')
            .data(videoGameTiles)
            .enter()
            .append('g')
            .attr('transform', (game) => {
                return 'translate(' + game['x0'] + ', ' + game['y0'] + ')'
            })

    block.append('rect')
         .attr('class', 'tile')
         .attr('fill', (game) => {
            let category = game['data']['category']
            if(category === 'Wii'){
                return 'blue'
            }else if(category === 'X360'){
                return 'yellow'
            }else if(category === 'NES'){
                return 'red'
            }else if(category === 'PS2'){
                return 'grey'
            }else if(category === 'DS'){
                return 'green'
            }else if(category === 'GB'){
                return 'pink'
            }else if(category === 'PS3'){
                return 'brown'
            }else if(category === '3DS'){
                return 'lightblue'
            }else if(category === 'PS'){
                return 'orange'
            }else if(category === 'N64'){
                return 'lightbrown'
            }else if(category === 'PS4'){
                return 'coral'
            }else if(category === 'SNES'){
                return 'khaki'
            }else if(category === 'GBA'){
                return 'tan'
            }else if(category === 'XB'){
                return 'lightpink'
            }else if(category === 'PC'){
                return 'lightyellow'
            }else if(category === '2600'){
                return 'lightgreen'
            }else if(category === 'PSP'){
                return 'lightblue'
            }else if(category === 'XOne'){
                return 'lightgrey'
            }

         }).attr('data-name', (game) => {
                return game['data']['name']
            })
            .attr('data-category', (game) => {
                return game['data']['category']
            })
            .attr('data-value', (game) => {
                return game['data']['value']
            })
            .attr('width', (game) => {
                return game['x1'] - game['x0']
            })
            .attr('height', (game) => {
                return game['y1'] - game['y0']
            })
            .on('mouseover', (game) => {
                tooltip.transition()
                       .style('visibility', 'visible')

                let revenue = game['data']['value']


                tooltip.html(
                    '$ ' + revenue + '<hr />' + 
                    game['data']['name'] + '<hr />' 
                    + game['data']['category']
                )

                tooltip.attr('data-value', revenue)

            })
            .on('mouseout', (game) => {
                tooltip.transition()
                       .style('visibility', 'hidden')
            })


     block.append('text')
          .text((game) => {
            return game['data']['name']
          })
          .attr('x', 5)
          .attr('y', 20)
                  



}

d3.json(videoGameDataUrl).then(
    (data, error) => {
        if(error){
            console.log(error)
        } else {
            videoGameData = data
            console.log(videoGameData)
            drawTreeMap()

        }
    }
)







