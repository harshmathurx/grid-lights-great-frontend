import { useState } from 'react';

const Cell = ({ filled, onClick, isDisabled }) => {
  return (
    <button
      disabled={isDisabled}
      type="button"
      onClick={onClick}
      className={filled ? "cell cell-activated" : "cell"}
    />
  );
};

export default function Home() {
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((originalOrder) => {
        const newOrder = originalOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return newOrder;
      });
    }, 300);
  };

  const activateIndex = (index) => {
    if (order.includes(index)) return;
    const newOrder = [...order, index];
    setOrder(newOrder);
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };

  return (
    <div className="wrapper" >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length},1fr)`,
        }}
      >
        {config
          .flat(1)
          .map((value, index) =>
            value == 1 ? (
              <Cell
                key={index}
                filled={order.includes(index)}
                onClick={() => activateIndex(index)}
                isDisabled={order.includes(index) || isDeactivating}
              />
            ) : (
              <span key={index}></span>
            )
          )}
      </div>
    </div>
  );
}
