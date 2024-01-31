import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const NetWorthOverTime = ({ data }) => {
    const d3Container = useRef(null);

    // Chart dimensions and margins
    const width = 700;
    const height = 247;
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };

    useEffect(() => {
        if (data && d3Container.current) {
            const formattedData = data.map(d => ({
                balanceDate: new Date(d.balanceDate),
                totalBalance: +d.totalBalance
            }));

            // Clear the previous SVG content
            const svg = d3.select(d3Container.current);
            svg.selectAll("*").remove();

            // Scales
            const x = d3.scaleUtc()
                .domain(d3.extent(formattedData, d => d.balanceDate))
                .range([margin.left, width - margin.right]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(formattedData, d => d.totalBalance)])
                .range([height - margin.bottom, margin.top])
                .nice();

            // Define the mousemove function before using it
            const mousemove = (event) => {
                const x0 = x.invert(d3.pointer(event)[0]);
                const bisectDate = d3.bisector(d => d.balanceDate).left;
                const i = bisectDate(formattedData, x0, 1);
                const selectedData = formattedData[i - 1]; // Get the data left of the mouse
                tooltip.html(`Date: ${d3.timeFormat("%B %d, %Y")(selectedData.balanceDate)}<br>Balance: $${selectedData.totalBalance.toLocaleString()}`)
                    .style('left', `${event.pageX}px`)
                    .style('top', `${event.pageY - 28}px`);
            };

            // Tooltip div (hidden by default)
            const tooltip = d3.select('body').append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0)
                .style('position', 'absolute')
                .style('text-align', 'center')
                .style('padding', '8px')
                .style('font', '12px sans-serif')
                .style('background', 'lightsteelblue')
                .style('border', '0px')
                .style('border-radius', '8px')
                .style('pointer-events', 'none');

            // Area generator
            const area = d3.area()
                .curve(d3.curveStep)
                .x(d => x(d.balanceDate))
                .y0(y(0))
                .y1(d => y(d.totalBalance));

            // Append the area
            svg.append("path")
                .datum(formattedData)
                .attr("fill", "steelblue")
                .attr("d", area);

            // Append axes and grid
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y).ticks(height / 40).tickFormat(d3.format("$,")))
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line").clone()
                    .attr("x2", width - margin.left - margin.right)
                    .attr("stroke-opacity", 0.1));

            // Overlay for the entire chart area for mouse interaction
            svg.append("rect")
                .attr("class", "overlay")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("transform", `translate(${margin.left},${margin.top})`)
                .style("fill", "none")
                .style("pointer-events", "all")
                .on("mouseover", () => tooltip.style('opacity', 0.9))
                .on("mouseout", () => tooltip.style('opacity', 0))
                .on("mousemove", mousemove);
        }
    }, [data, width, height, margin]); // Depend on width, height, margin if they are dynamic

    return (
        <svg
            className="net-worth-chart"
            ref={d3Container}
            width={width}
            height={height}
            style={{
                maxWidth: '100%',
                height: 'auto',
                margin: '0 auto',
                display: 'block'
            }}
        />
    );
};

export default NetWorthOverTime;


