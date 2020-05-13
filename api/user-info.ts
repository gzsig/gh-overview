import { NowRequest, NowResponse } from "@now/node";
import { getUserInfo } from "../githubAPI/calls";

export default async (req: NowRequest, res: NowResponse) => {
  const { user } = req.query;

  try {
    let userInfo = await getUserInfo(user);
    const {
      avatar_url,
      html_url,
      name,
      blog,
      location,
      email,
      bio,
      public_repos,
      followers,
      login,
    } = userInfo.data;
    res.status(200).json({
      avatar_url,
      html_url,
      name,
      blog,
      location,
      email,
      bio,
      public_repos,
      followers,
      login,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
