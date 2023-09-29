import Tought from '../models/Tought.mjs';
import User from '../models/User.mjs';

import { Op } from 'sequelize';

export default class ToughtController{
        static async dashboard(req, res){
                const userId = await req.session.userid

                try {
                        const oneUser = await User.findOne({ where: { id: userId }, include: Tought, plain: true });

                        if(!oneUser){
                                res.redirect('/login')
                        }

                        const toughts = oneUser.Tougths.map((result) => result.dataValues)

                        console.log(toughts)

                        let emptyTougths = false;

                        if(toughts.length === 0){
                                emptyTougths = true;
                        }


                        res.render('toughts/dashboard', {toughts , emptyTougths});
                } catch (error) {
                        console.error(`Erro ao recuperar dados do usuário: ${error}`);
                }

        }

        static createTought(req, res){
                res.render('toughts/create')
        }

        static async createToughtSave(req, res){
                const tought = {
                        title: req.body.title,
                        UserId: req.session.userid
                }

                try {
                        await Tought.create(tought)

                        req.flash('message', 'Pensamento criado  com sucesso!')

                        req.session.save(()=>{
                        res.redirect('/toughts/dashboard')
                })
                } catch (error) {
                        console.log(`Erro: ${error}`)
                }
        }

        static async showToughts(req, res){
                res.render('toughts/home')
        }

        static async removeTought(req, res){
                const id = req.body.id

                try {
                        
                        await Tought.destroy({where: {id: id}})

                        req.flash('message', 'Pensamento removido  com sucesso!')

                        req.session.save(()=>{
                                res.redirect('/toughts/dashboard')
                        })

                } catch (error) {
                        console.error(`Erro ao remover dado: ${error}`);
                }
        }

}