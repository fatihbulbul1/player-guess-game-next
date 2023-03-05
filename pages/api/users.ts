import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/connection";
import { ResponseFuncs } from "../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const catcher = (error: Error) => res.status(400).json({ error });

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { PUsers } = await connect();
      res
        .status(201)
        .json(
          await PUsers.find({}, {}, { sort: { points: -1 } }).catch(catcher)
        );
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { PUsers } = await connect();
      if (req.body.type === "P") {
        const usr = await PUsers.findOneAndUpdate(
          { name: req.body.name },
          { $inc: { points: req.body.points } }
        );
        res.json(usr);
      } else {
        const { name, password } = req.body;
        if (req.body.type === "L") {
          const usr = (await PUsers.find({ name: name, password: password }))
            .length;
          if (usr) res.status(200).json(true);
          else res.status(500).json(false);
        } else if (req.body.type === "R") {
          if ((await PUsers.find({ name: name })).length === 0) {
            const newUser = await new PUsers({ name, password });
            try {
              await newUser.save();
              res.status(201).json("success");
            } catch (error) {
              console.log(error);
              res.status(500).json({ error: "Error saving user." });
            }
          } else res.json("exist");
        }
      }
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
