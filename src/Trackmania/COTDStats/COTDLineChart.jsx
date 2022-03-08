//external
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

//components
import {Section, SectionTitle} from '../../StyledComponents/General/Section';

export function COTDLineChart(props){
    return(
        <div style={{"marginTop": '1em', "marginBottom": '1em'}}>
            <Section>
                <SectionTitle>Evolution of Div and DivRank</SectionTitle>
                <ResponsiveContainer width="99%" height={400}>
                    <LineChart
                    width={500}
                    height={300}
                    data={props.data}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                    >
                        <XAxis tickSize={10} minTickGap={1}/>
                    
                        <YAxis 
                            domain={[0, 64]} 
                            // label={{ value: width > 1024 ? 'rank' : 'r', position: 'outsideLeft', dx:-20}}
                        />
                        <YAxis 
                            yAxisId='1' 
                            orientation='right' 
                            // label={{ value: width > 1024 ? 'Div' : 'd', position: 'insideRight', dx:20}}
                        />
                        <Tooltip labelFormatter={(totalplayers) => 'Date: '+ props.data[totalplayers].timestamp}/>
                        <Legend />
                        
                        <Line type="monotone" dataKey="divrank" stroke="#82ca9d" strokeWidth={2}/>
                        <Line 
                            type="monotone" 
                            dataKey="div" 
                            stroke="#8884d8" 
                            yAxisId='1' 
                            strokeWidth={4}
                        />
                    </LineChart>    
                </ResponsiveContainer>
            </Section>
            
            <Section>
                <SectionTitle>Evolution of top percentage</SectionTitle>
                <ResponsiveContainer width="99%" height={400}>
                    <LineChart
                        width={500}
                        height={300}
                        data={props.data}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                        >
                        <XAxis tickSize={10}/>
                    
                        <YAxis 
                            domain={[0, 64]} 
                            // label={{ value: '%', position: 'outsideLeft' }}
                        />
                        <YAxis 
                            yAxisId='1' 
                            orientation='right' 
                            axisLine={false} //hidden YAxis to keep the charts to the same size, same for next one
                        />
                        <Tooltip labelFormatter={(totalplayers) => 'Date: '+ props.data[totalplayers].timestamp}/>
                        <Legend />
                        <Line 
                            type="monotone" 
                            dataKey="percent" 
                            stroke="#8884d8"  
                            strokeWidth={4}
                        />
                    </LineChart>    
                </ResponsiveContainer>

            </Section>
            
            <Section>
                <SectionTitle>Amount of Players</SectionTitle>
                <ResponsiveContainer width="99%" height={400}>
                    <LineChart
                        width={500}
                        height={300}
                        data={props.data}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                        >
                        <XAxis tickSize={10}/>
                    
                        <YAxis 
                            domain={[0, 64]} 
                            // label={{ value: width > 1024 ? 'players' : '', position: 'outsideLeft', dx:-20}}
                        />
                        <YAxis 
                            yAxisId='1' 
                            orientation='right' 
                            axisLine={false}
                        />
                        <Tooltip labelFormatter={(totalplayers) => 'Date: '+ props.data[totalplayers].timestamp}/>
                        <Legend />
                        <Line 
                            type="monotone" 
                            dataKey="totalplayers" 
                            stroke="#8884d8"  
                            strokeWidth={4}
                        />
                    </LineChart>    
                </ResponsiveContainer>


            </Section>
            
        </div>
        
    )
}

