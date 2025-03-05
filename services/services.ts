"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";

const getData = async (url: string) => {
  try {
    const token = (await cookies()).get("userToken")?.value;
    const { data } = await api.get(url, {
      headers: {
        Cookie: `userToken=${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching data");
    return null;
  }
};

const postData = async (url: string, postData: any) => {
  try {
    const token = (await cookies()).get("userToken")?.value;
    const { data } = await api.post(url, postData, {
      headers: {
        Cookie: `userToken=${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error in postData");
    return null;
  }
};

const putData = async (url: string, newData: any) => {
  try {
    const token = (await cookies()).get("userToken")?.value;
    const { data } = await api.patch(url, newData, {
      headers: {
        Cookie: `userToken=${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error in putData");
    return null;
  }
};

const deleteData = async (url: string, id: string) => {
  try {
    const token = (await cookies()).get("userToken")?.value;
    const { data } = await api.delete(url, {
      data: { id },
      headers: {
        Cookie: `userToken=${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error deleting data");
    return null;
  }
};

const updateUser = async (newData: any) => {
  try {
    const token = (await cookies()).get("userToken")?.value;
    const { data } = await api.patch(`/user/update`, newData, {
      headers: {
        Cookie: `userToken=${token}`,
        Accept: "application/json",
        "Content-Type": "application/jsonn",
      },
    });
    return data;
  } catch (error) {
    console.error("Error in updateUser");
    return null;
  }
};

export { getData, postData, putData, deleteData, updateUser };
