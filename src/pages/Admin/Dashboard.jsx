import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/services/Navbar";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  addItems,
  getAllItems,
  removeItems,
  updateItems,
} from "@/services/firebaseConfig";
import { toast } from "sonner";
import { getOrder, deleteOrder } from "@/services/firebaseConfig";

const OrderCards = ({ order }) => {
  const [viewOrder, setViewOrder] = React.useState(false);
  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      setViewOrder(!viewOrder);
      toast.success("Order Deleted Successfully");
    } catch (error) {
      // console.error("Error deleting order:", error);
      toast.error("Error deleting order");
    }
  };
  return (
    <>
      {viewOrder && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#13131399] dark:bg-[#ffffff3d] flex items-center justify-center">
          <div className="bg-white dark:bg-[#000000]  rounded-2xl flex flex-col h-[90vh] w-[90vw]">
            {/* header */}
            <Button
              variant="outline"
              size="icon"
              className="m-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <X onClick={() => setViewOrder(!viewOrder)} />
            </Button>
            {/* details */}
            <div className="flex sm:flex-row flex-col h-[85%]">
              <div className=" w-full p-2 border-e overflow-auto">
                <p className="text-xl">Items</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className=" w-full">
                <p className="text-xl m-2">Order Details</p>
                <div className="bg-[#69696937] dark:bg-[#ffffff25] rounded-xl p-2 m-2">
                  <p>Order ID: {order.orderId}</p>
                  <p>Name : {order.name}</p>
                  <p className="text-amber-600">Order Status: {order.status}</p>
                  <p>
                    Order Date:{" "}
                    {new Date(
                      order.orderDate.seconds * 1000
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    Order Time: {new Date(order.orderDate).toLocaleTimeString()}
                  </p>
                </div>
                <div className="border-t-2">
                  <p className="text-xl m-2">Shipping Address</p>
                  <div className="bg-[#69696937] dark:bg-[#ffffff25] rounded-xl p-2 m-2">
                    <p>{order.name}</p>
                    <p>{order.mobile}</p>
                    <p>{order.address}</p>
                    <p>{order.locality}</p>
                    <p>
                      {order.city}, {order.state}, {order.pincode}
                    </p>
                    <p>{order.landmark}</p>
                    <p>{order.alternatePhone}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* btns */}
            <div className="text-end mx-4 my-2">
              <Button
                onClick={() => handleDeleteOrder(order.id)}
                variant="destructive"
                className="mx-6"
              >
                Reject Order
              </Button>
              <Button
              onClick = {()=>handleDeleteOrder(order.id)}
              className="bg-green-500 hover:bg-green-400">
                Accept Order
              </Button>
            </div>
          </div>
        </div>
      )}
      <Card className="dark:bg-[#7f7f7f45] dark:border-[#525252] bg-[#e0e0e01c]">
        <div className="flex flex-row">
          <div className="flex flex-col p-2">
            <p className="font-semibold">ID: {order.orderId}</p>
            <p>Order Status: {order.status}</p>
            <p>
              Order Date:
              {new Date(order.orderDate.seconds * 1000).toLocaleDateString()}
            </p>
            <p>
              OrderTime:
              {new Date(order.orderDate.seconds * 1000).toLocaleTimeString()}
            </p>
            <p className="font-semibold">
              AED.{" "}
              {order.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </p>
            <Button
              className="m-2 bg-green-600 hover:bg-green-500 text-white"
              onClick={() => setViewOrder(!viewOrder)}
            >
              View Order
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

function Dashboard() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const unsubscribe = getOrder(setOrders);
    return () => unsubscribe && unsubscribe();
  }, []);

  const [addItem, setAddItem] = useState(false);
  const [removeItem, setRemoveItem] = useState(false);
  const [updateItem, setUpdateItem] = useState(false);

  const AddItem = () => {
    const [data, setData] = useState({
      name: "",
      description: "",
      price: 0,
      image: "",
    });
    const handleSetItem = async () => {
      if (
        data.name === "" ||
        data.description === "" ||
        data.price === 0 ||
        data.image === ""
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      try {
        // console.log(data);
        await addItems(data).then(() => {
          setAddItem(!addItem);
        });
        toast.success("Item Added Successfully");
      } catch (error) {
        // console.error("Error adding item:", error);
        toast.error("Error adding item");
      }
    };

    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#13131399] dark:bg-[#ffffff3d] flex items-center justify-center">
        <div className="bg-white dark:bg-[#000000]  rounded-2xl p-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setAddItem(!addItem)}
          >
            <X />
          </Button>
          <div className="flex flex-col">
            <label className="mx-2 mt-2">Name</label>
            <input
              type="text"
              placeholder="Item Name"
              className="border rounded p-2 m-1"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <label className="mx-2 mt-2">Description</label>
            <input
              type="text"
              placeholder="Description"
              className="border rounded p-2 m-1"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
            <label className="mx-2 mt-2">Price</label>
            <input
              type="number"
              placeholder="Item Price"
              className="border rounded p-2 m-1"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
          </div>
          <div>
            <label className="mx-2 mt-2">Image URL</label>
            <input
              type="text"
              placeholder="Item Image URL"
              className="border rounded p-2 m-1"
              value={data.image}
              onChange={(e) => setData({ ...data, image: e.target.value })}
            />
            <Button
              onClick={handleSetItem}
              className="m-2 bg-green-600 hover:bg-green-500 text-white"
            >
              Add Item
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const RemoveItem = () => {
    const [name, setName] = useState("");
    const [items, setItems] = useState([]);
    const [res, setRes] = useState([]);
    // get all items first
    useEffect(() => {
      const fetchItems = async () => {
        const items = await getAllItems();
        setItems(items);
      };
      fetchItems();
    }, []);
    //search items
    const search = () => {
      if (name.length > 0) {
        const search = items.filter((item) =>
          item.name.toLowerCase().includes(name.toLowerCase())
        );
        setRes(search);
      } else {
        setRes([]); // Clear results if text is empty
      }
    };
    //search item on text change
    useEffect(() => {
      search();
    }, [name]);

    //remove item
    const handleRemoveItem = async (id) => {
      try {
        await removeItems(id).then(() => {
          setRemoveItem(!removeItem);
        });
        toast.success("Item Removed Successfully");
      } catch (error) {
        // console.error("Error removing item:", error);
        toast.error("Error removing item");
      }
    };
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#13131399] dark:bg-[#ffffff3d] flex items-center justify-center">
        <div className="bg-white dark:bg-[#000000]  rounded-2xl p-2">
          {/* cut button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setRemoveItem(!removeItem)}
          >
            <X />
          </Button>
          <div className="flex flex-col">
            <label className="mx-2 mt-2">Search Item Name</label>
            <input
              type="text"
              placeholder="Item Name"
              className="border rounded p-2 m-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            {res.map((item, index) => (
              <Card key={index} className="dark:bg-[#7f7f7f45] dark:border-[#525252] bg-[#e0e0e01c]">
                <div className="flex flex-row">
                  <div className="flex flex-col p-2">
                    <p className="font-semibold">{item.name}</p>
                    <p>{item.description}</p>
                    <p>Price: {item.price}</p>
                    <Button
                      className="m-2 bg-red-600 hover:bg-red-500 text-white"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove Item
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const UpdateItem = () => {
    const [name, setName] = useState("");
    const [items, setItems] = useState([]);
    const [res, setRes] = useState([]);
    // get all items first
    useEffect(() => {
      const fetchItems = async () => {
        const items = await getAllItems();
        setItems(items);
      };
      fetchItems();
    }, []);
    //search items
    const search = () => {
      if (name.length > 0) {
        const search = items.filter((item) =>
          item.name.toLowerCase().includes(name.toLowerCase())
        );
        setRes(search);
      } else {
        setRes([]); // Clear results if text is empty
      }
    };
    //search item on text change
    useEffect(() => {
      search();
    }, [name]);
    // updates from here
    const [data, setData] = useState({
      name: "",
      description: "",
      price: 0,
      image: "",
    });
    const handleUpdateItems = async (item) => {
      if (
        data.name === "" ||
        data.description === "" ||
        data.price === 0 ||
        data.image === ""
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      try {
        await updateItems(item.id, data).then(() => {
          setUpdateItem(!updateItem);
        });
        toast.success("Item Updated Successfully");
      } catch (error) {
        // console.error("Error updating item:", error);
        toast.error("Error updating item");
      }
    };
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#13131399] dark:bg-[#ffffff3d] flex items-center justify-center">
        <div className="bg-white dark:bg-[#000000]  rounded-2xl p-2">
          {/* close btn */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setUpdateItem(!updateItem)}
          >
            <X />
          </Button>
          {/* input */}
          <div className="flex flex-col">
            <label className="mx-2 mt-2">Search Item Name</label>
            <Input
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* res */}
          <div className="flex flex-col gap-2">
            {res.map((item, index) => (
              <Card key={index}>
                <div className="flex flex-col gap-2 p-2">
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        defaultValue={item.name}
                        className="col-span-2 h-8"
                        onChange={(e) =>
                          setData({ ...item, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        defaultValue={item.description}
                        className="col-span-2 h-8"
                        onChange={(e) =>
                          setData({ ...item, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        type="number"
                        id="price"
                        defaultValue={item.price}
                        className="col-span-2 h-8"
                        onChange={(e) =>
                          setData({ ...item, price: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="image">Image Url</Label>
                      <Input
                        id="image"
                        defaultValue={item.image}
                        className="col-span-2 h-8"
                        onChange={(e) =>
                          setData({ ...item, image: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleUpdateItems(item)}>
                    Update Item
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {addItem && <AddItem />}
      {removeItem && <RemoveItem />}
      {updateItem && <UpdateItem />}
      <Navbar />
      {/* admin options */}
      <div className="flex flex-row gap-4 items-center justify-center m-4">
        <Button variant={"outline"} onClick={() => setAddItem(!addItem)}>
          Add Item
        </Button>
        <Button variant={"outline"} onClick={() => setRemoveItem(!removeItem)}>
          Remove Item
        </Button>
        <Button variant={"outline"} onClick={() => setUpdateItem(!updateItem)}>
          Update Item
        </Button>
      </div>

      {/* orders */}
      <div className="m-1">
        <p>Orders</p>
        <div className="flex flex-row flex-wrap gap-4 m-2">
          {orders.map((order, index) => (
            <OrderCards key={index} order={order} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
