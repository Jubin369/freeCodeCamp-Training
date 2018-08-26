
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
  const renderFrameworks = frontEndFrameworks; // change code here
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks.map((val,index)=>{
          return <li key={index}>{val}</li>;
        })}
      </ul>
    </div>
  );
};
