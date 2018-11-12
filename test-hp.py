import math
from hyperopt import fmin, tpe, hp
from hyperopt.mongoexp import MongoTrials
from ghost import ImageClassificationKeras as ick


space = {
    'learning_rate': hp.uniform('learning_rate', 0.001, 0.05),
    'num_layers': hp.uniform('num_layers', 1, 10),
}

ick.setImagePath("/Users/tonywu/workspaces/react/ai-platform/flask/planes/planesnet")

trials = MongoTrials('mongo://localhost:1234/hp/jobs', exp_key='img1')
best = fmin(ick.train, space, trials=trials, algo=tpe.suggest, max_evals=10)
